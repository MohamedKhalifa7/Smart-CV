import { Document, Packer, Paragraph, TextRun } from "docx";
import { ICV } from "../models/cvModel";
import path from "path";
import fs from "fs";

async function exportWordCV(CV: ICV): Promise<string> {
  const skillsText = CV.skills?.skills?.join(", ") || "No skills listed";
  const languagesText = CV.skills?.languages || "No languages listed";
  const certificationsText = CV.skills?.certifications || "No certifications listed";

  const doc = new Document({
    sections: [
      {
        children: [
          
          new Paragraph({
            children: [
              new TextRun({ text: "Personal Information", bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(`Name: ${CV.personalInfo.firstName} ${CV.personalInfo.lastName}`),
              new TextRun({ break: 1 }),
              new TextRun(`Email: ${CV.personalInfo.email}`),
              new TextRun({ break: 1 }),
              new TextRun(`Phone: ${CV.personalInfo.phone}`),
              new TextRun({ break: 1 }),
              new TextRun(`Location: ${CV.personalInfo.location}`),
              new TextRun({ break: 1 }),
              new TextRun(`Professional Title: ${CV.personalInfo.professionalTitle}`),
              new TextRun({ break: 1 }),
              new TextRun(`Summary: ${CV.personalInfo.professionalSummary}`),
            ],
            spacing: { after: 400 },
          }),

          
          new Paragraph({
            children: [new TextRun({ text: "Experience", bold: true, size: 28 })],
            spacing: { after: 200 },
          }),
          ...CV.experience.map((exp) =>
            new Paragraph({
              children: [
                new TextRun({ text: `${exp.jobTitle} at ${exp.company}`, bold: true }),
                new TextRun({ break: 1 }),
                new TextRun(`Location: ${exp.location}`),
                new TextRun({ break: 1 }),
                new TextRun(`From ${new Date(exp.startDate).toLocaleDateString()} to ${new Date(exp.endDate).toLocaleDateString()}`),
                new TextRun({ break: 1 }),
                new TextRun(`Description: ${exp.description}`),
              ],
              spacing: { after: 300 },
            })
          ),

          
          new Paragraph({
            children: [new TextRun({ text: "Education", bold: true, size: 28 })],
            spacing: { after: 200 },
          }),
          ...CV.education.map((edu) =>
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.institution}`, bold: true }),
                new TextRun({ break: 1 }),
                new TextRun(`Degree: ${edu.degree}`),
                new TextRun({ break: 1 }),
                new TextRun(`Location: ${edu.location}`),
                new TextRun({ break: 1 }),
                new TextRun(`Years: ${edu.startYear} - ${edu.endYear}`),
                new TextRun({ break: 1 }),
                new TextRun(`Description: ${edu.description}`),
              ],
              spacing: { after: 300 },
            })
          ),

          
          new Paragraph({
            children: [
              new TextRun({ text: "Skills", bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun(skillsText)],
            spacing: { after: 400 },
          }),

          
          new Paragraph({
            children: [
              new TextRun({ text: "Languages", bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(languagesText),
            ],
            spacing: { after: 400 },
          }),

         
          new Paragraph({
            children: [
              new TextRun({ text: "Certifications", bold: true, size: 28 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(certificationsText),
            ],
            spacing: { after: 400 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);

  const fileName = `${CV.personalInfo.firstName}-${CV.personalInfo.lastName}-CV.docx`.replace(/\s+/g, "-");
  const outPath = path.join(__dirname, "../exports", fileName);

  const dirPath = path.dirname(outPath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(outPath, buffer);

  return outPath;
}

export default exportWordCV;
