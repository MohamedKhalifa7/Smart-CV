import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { ICV } from "../models/cvModel";

  

export const exportPdfCV = async (CV: ICV, templateName: string) => {
    const templatePath = path.join(__dirname, `../templates/${templateName}.html`);
    const source = fs.readFileSync(templatePath, "utf-8");

    const template = Handlebars.compile(source);
    const rendered = template({
        firstName: CV.personalInfo.firstName,
        lastName: CV.personalInfo.lastName,
        email: CV.personalInfo.email,
        phone: CV.personalInfo.phone,
        location: CV.personalInfo.location,
        professionalTitle: CV.personalInfo.professionalTitle,
        professionalSummary: CV.personalInfo.professionalSummary,
        skills: CV.skills &&CV.skills.skills && Array.isArray(CV.skills.skills) ? CV.skills.skills.join(", ") : "",
        experience: CV.experience,
        education: CV.education,
        languages: CV.skills.languages,
        certifications: CV.skills.certifications,
    });

    fs.mkdirSync(path.join(__dirname, "../exports"), { recursive: true });

    const filePath = path.join(__dirname, "../exports", `${CV.personalInfo.firstName}_CV.pdf`);

    const browser = await puppeteer.launch();
    const Page = await browser.newPage();

    await Page.setContent(rendered, { waitUntil: "networkidle0" });
    await Page.pdf({ path: filePath, format: "A4" });

    await browser.close();
    return filePath;
};
