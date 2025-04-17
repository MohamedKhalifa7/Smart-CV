import { Request, Response, NextFunction } from "express";
import { generateAIContent } from "../services/aiWritingService";

export const aiWritingAssist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobTitle, sectionName, industry, experience } = req.body;

  if (!jobTitle || !sectionName || !industry || !experience) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    const generatedContent = await generateAIContent(
      jobTitle,
      sectionName,
      industry,
      experience
    );
    res.status(200).json({ sectionName,generatedContent });
  } catch (error) {
    next(error);
  }
};
