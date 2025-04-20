import { Router } from "express";
import {
  saveCV,
  getUserCVs,
  getCV,
  editCV,
  removeCV,
} from "../controllers/cvBuilderController";
import { authenticateToken } from "../middleware/validateJWTMiddleware";

const router = Router();

router.post("/save", authenticateToken, saveCV);

router.get("/user", authenticateToken, getUserCVs);

router.get("/:cvId", authenticateToken, getCV);

router.put("/:cvId", authenticateToken, editCV);

router.delete("/:cvId", authenticateToken, removeCV);

export default router;
