import { Request, Response } from "express";
import { extractText } from "../services/extractTextService";
import { aiResponse } from "../services/aiService";

export const analyzeCVController = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;

  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

    const extractedText = await extractText(file.path, file.mimetype);
    const { score, sectionsToImprove,positiveFeedback,neutralFeedback,negativeFeedback } = await aiResponse(extractedText);

    res.status(200).json({
      message: "CV analyzed successfully",
      originalFile: {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        path: file.path
      },
      extractedText,
      atsScore: score,
      sectionsToImprove: sectionsToImprove,
      positiveFeedback,
      neutralFeedback,
      negativeFeedback
    })

};
