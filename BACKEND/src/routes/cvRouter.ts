import { Router } from "express";
const router = Router();
import {exportCVController} from "../controllers/cvExportController";
import upload from "../services/importService";
import { importCVController } from "../controllers/cvImportController";
import { validateLoginInput } from "../middleware/validationMiddleware";
import { analyzeCVController } from "../controllers/cvAnalaysController";
import { aiWritingAssist } from "../controllers/AIWritingController";
import { GrammarController } from "../controllers/grammarCheckerController";

router.get("/exports/:cvId",validateLoginInput, exportCVController);
router.post("/upload-cv",validateLoginInput,upload.single("cv"),importCVController);
router.post("/analyze", upload.single("cv"), analyzeCVController);
router.post("/ai-writing-assist", aiWritingAssist);
router.post("/grammarcheck",GrammarController);

export default router