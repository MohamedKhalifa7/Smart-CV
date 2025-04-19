import { Request, Response } from "express";
import {
  createCV,
  getCVsByUser,
  getCVById,
  updateCV,
  deleteCV,
} from "../services/cvBuilderService";

// Create CV
export const saveCV = async (req: Request, res: Response) => {
  const { userId, title, personalInfo, experience, education, skills } =
    req.body;
  const result = await createCV({
    userId,
    title,
    personalInfo,
    experience,
    education,
    skills,
  });
  res.status(result.status).json(result);
};

// Get CVs by User ID
export const getUserCVs = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await getCVsByUser(userId);
  res.status(result.status).json(result);
};

// Get CV by ID
export const getCV = async (req: Request, res: Response) => {
  const { cvId } = req.params;
  const result = await getCVById(cvId);
  res.status(result.status).json(result);
};

// Update CV
export const editCV = async (req: Request, res: Response) => {
  const { cvId } = req.params;
  const cvData = req.body;
  const result = await updateCV(cvId, cvData);
  res.status(result.status).json(result);
};

// Delete CV
export const removeCV = async (req: Request, res: Response) => {
  const { cvId } = req.params;
  const result = await deleteCV(cvId);
  res.status(result.status).json(result);
};
