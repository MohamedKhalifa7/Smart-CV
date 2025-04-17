import { Router } from "express";
const router = Router();
import {exportCVController} from "../controllers/cvExportController";
import upload from "../services/importService";
import { importCVController } from "../controllers/cvImportController";

router.get("/exports/:cvId", exportCVController)
router.post("/upload-cv",upload.single("cv"),importCVController)

export default router