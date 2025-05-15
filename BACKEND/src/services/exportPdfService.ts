import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { ICV } from "../models/cvModel";

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const exportPdfCV = async (CV: ICV, templateName: string) => {
  const templatePath = path.resolve(
    __dirname,
    "..",
    "templates",
    `${templateName}.html`
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template ${templateName}.html not found at ${templatePath}`);
  }

  const source = fs.readFileSync(templatePath, "utf-8");

  const formattedExperience = CV.experience.map((exp) => ({
    ...exp,
    startDate: formatDate(exp.startDate),
    endDate: formatDate(exp.endDate),
  }));

  const formattedEducation = CV.education.map((edu) => ({
    ...edu,
    startDate: formatDate(edu.startYear),
    endDate: formatDate(edu.endYear),
  }));

  const template = Handlebars.compile(source);
  const rendered = template({
    firstName: CV.personalInfo.firstName,
    lastName: CV.personalInfo.lastName,
    email: CV.personalInfo.email,
    phone: CV.personalInfo.phone,
    location: CV.personalInfo.location,
    professionalTitle: CV.personalInfo.professionalTitle,
    professionalSummary: CV.personalInfo.ProfessionalSummary,
    skills: CV.skills?.skills?.join(", ") || "",
    experience: formattedExperience,
    education: formattedEducation,
    languages: CV.skills.languages,
    certifications: CV.skills.certifications,
  });

  const exportsDir = path.resolve(__dirname, "..", "exports");
  fs.mkdirSync(exportsDir, { recursive: true });

  const filePath = path.join(
    exportsDir,
    `${CV.personalInfo.firstName} ${CV.personalInfo.lastName}_CV.pdf`
  );

  const browser = await puppeteer.launch(
    process.env.NODE_ENV === 'production'
      ? {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
          ]
        }
      : {}
  );

  const Page = await browser.newPage();

  await Page.setContent(rendered, { waitUntil: "networkidle0" });
  await Page.pdf({ path: filePath, format: "A4", printBackground: true });

  await browser.close();
  return filePath;
};
