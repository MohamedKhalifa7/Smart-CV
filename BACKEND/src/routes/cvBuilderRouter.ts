import { Router } from "express";
import {
  saveCV,
  getUserCVs,
  getCV,
  editCV,
  removeCV,
} from "../controllers/cvBuilderController";

const router = Router();

router.post("/save", saveCV);

router.get("/user/:userId", getUserCVs);

router.get("/:cvId", getCV);

router.put("/:cvId", editCV);

router.delete("/:cvId", removeCV);

export default router;
