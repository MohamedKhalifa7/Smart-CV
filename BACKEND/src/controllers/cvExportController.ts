import { Request, Response } from "express";
import exportWordCV from "../services/exportDocxService";
import cvModel from "../models/cvModel";
import { exportPdfCV } from "../services/exportPdfService";

export const exportCVController = async (req: Request, res: Response) => {
    try {
        console.log("controller hit")
        const CV = await cvModel.findById(req.params.cvId);
        if (!CV) {
            res.status(404).json({ message: "CV not found!" });
            return;
        }

        const plainCV = CV.toObject()

        console.log(plainCV)

        const format = req.query.format?.toString().toLowerCase() || "word";
        const template = req.query.template?.toString() || "classic-cv";

        if (format === "pdf") {
            const filePath = await exportPdfCV(plainCV, template);
            return res.download(filePath, (err) => {
                if (err) {
                    console.error(err);
                    res.status(409).json({ message: "Error during download", error: err });
                    return;
                }
            });
        }

        if (format === "word") {
            const buffer = await exportWordCV(plainCV);

            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            res.setHeader("Content-Disposition", `attachment; filename="${CV.personalInfo.firstName.replace(/\s+/g, "-")}_CV.docx"`);

            res.send(buffer); 
            return;
        }

        res.status(400).json({ message: "Unsupported format, only PDF & Word are allowed" });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Export failed!", error });
        return;
    }
}
