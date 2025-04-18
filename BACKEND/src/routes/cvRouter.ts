import { Router } from "express";
const router = Router();
import {exportCVController} from "../controllers/cvExportController";
import upload from "../services/importService";
import { importCVController } from "../controllers/cvImportController";
import { validateLoginInput } from "../middleware/validationMiddleware";

router.get("/exports/:cvId",validateLoginInput, exportCVController)
router.post("/upload-cv",validateLoginInput,upload.single("cv"),importCVController)

export default router