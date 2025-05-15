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
  const templatePath = path.join(
    process.env.NODE_ENV === 'production' 
      ? path.join(process.cwd(), 'dist', 'templates')
      : path.join(__dirname, '../templates'),
    `${templateName}.html`
  );
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

  fs.mkdirSync(path.join(__dirname, "../exports"), { recursive: true });

  const filePath = path.join(
    __dirname,
    "../exports",
    `${CV.personalInfo.firstName} ${CV.personalInfo.lastName}_CV.pdf`
  );

//   const browser = await puppeteer.launch();
 const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
        ]
    });
  const Page = await browser.newPage();

  await Page.setContent(rendered, { waitUntil: "networkidle0" });
  await Page.pdf({ path: filePath, format: "A4", printBackground: true });

  await browser.close();
  return filePath;
};
