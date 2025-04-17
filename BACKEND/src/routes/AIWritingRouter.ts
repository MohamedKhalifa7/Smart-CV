import { Router } from "express";
import { aiWritingAssist } from "../controllers/AIWritingController";

const router = Router();

router.post("/ai-writing-assist", aiWritingAssist);

export default router;