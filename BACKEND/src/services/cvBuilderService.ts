import { StatusCodes } from "http-status-codes";
import CV from "../models/cvBuilderModel";
import { CVParams } from "../types/cvBuilder.types";

// Create CV
export const createCV = async (cvData: CVParams & { userId: string }) => {
  try {
    const cv = await CV.create(cvData);
    return {
      status: StatusCodes.CREATED,
      message: "CV created successfully",
      cv,
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to create CV" },
    };
  }
};

// Get CVs by User ID
export const getCVsByUser = async (userId: string) => {
  try {
    const cvs = await CV.find({ userId });
    return {
      status: StatusCodes.OK,
      cvs,
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to fetch CVs" },
    };
  }
};

// Get CV by ID
export const getCVById = async (cvId: string) => {
  try {
    const cv = await CV.findById(cvId);
    if (!cv) {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "CV not found" },
      };
    }
    return {
      status: StatusCodes.OK,
      cv,
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to fetch CV" },
    };
  }
};

// Update CV
export const updateCV = async (cvId: string, cvData: Partial<CVParams>) => {
  try {
    const cv = await CV.findByIdAndUpdate(cvId, cvData, { new: true });
    if (!cv) {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "CV not found" },
      };
    }
    return {
      status: StatusCodes.OK,
      message: "CV updated successfully",
      cv,
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to update CV" },
    };
  }
};

// Delete CV
export const deleteCV = async (cvId: string) => {
  try {
    const cv = await CV.findByIdAndDelete(cvId);
    if (!cv) {
      return {
        status: StatusCodes.NOT_FOUND,
        error: { message: "CV not found" },
      };
    }
    return {
      status: StatusCodes.OK,
      message: "CV deleted successfully",
    };
  } catch (error) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: { message: "Failed to delete CV" },
    };
  }
};
