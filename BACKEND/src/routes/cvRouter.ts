import { Router } from "express";
import { exportCVController } from "../controllers/cvExportController";
import upload from "../services/importService";
import { importCVController } from "../controllers/cvImportController";
import { validateLoginInput } from "../middleware/validationMiddleware";
import { analyzeCVController } from "../controllers/cvAnalaysController";
import { aiWritingAssist } from "../controllers/AIWritingController";
import { GrammarController } from "../controllers/grammarCheckerController";
import { authenticateToken } from "../middleware/validateJWTMiddleware";
import { requireProUser } from "../middleware/roleMiddleware";

const router = Router();
router.get("/exports/:cvId",exportCVController);
router.post("/upload-cv",validateLoginInput,upload.single("cv"),importCVController);
// router.post("/upload-cv",upload.single("cv"),importCVController);

router.post("/analyze", upload.single("cv"), analyzeCVController);
router.post(
  "/ai-writing-assist",
  authenticateToken,
  requireProUser,
  aiWritingAssist
);
router.post(
  "/grammarcheck",
  authenticateToken,
  requireProUser,
  GrammarController
);

export default router;
