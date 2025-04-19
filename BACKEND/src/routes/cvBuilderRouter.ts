import { Router } from "express";
import {
  saveCV,
  getUserCVs,
  getCV,
  editCV,
  removeCV,
} from "../controllers/cvBuilderController";

const router = Router();

// Create CV
router.post("/save", saveCV);

// Get all CVs for a user
router.get("/user/:userId", getUserCVs);

// Get a single CV by ID
router.get("/:cvId", getCV);

// Update a CV by ID
router.put("/:cvId", editCV);

// Delete a CV by ID
router.delete("/:cvId", removeCV);

export default router;
