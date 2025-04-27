import { Request,Response } from "express";
import exportWordCV from "../services/exportDocxService"
import cvModel from "../models/cvModel";
import { exportPdfCV } from "../services/exportPdfService";

export const exportCVController = async (req:Request,res:Response)=>{
    const CV = await cvModel.findById(req.params.cvId)
    if(!CV){
        res.status(404).json({message:"CV not found!"})
        return;
    }   

    const format = req.query.format?.toString().toLowerCase()||"word"
    const template = req.query.template?.toString()||"classic-cv"

    let filePath=""

    if(format==="pdf"){
        filePath = await exportPdfCV(CV,template)
        res.download(filePath, (err) => {
            if (err) {
                res.status(409).json({ message: "Error with download", err });
            }
        });
        return;
    }
    if (format === "word") {
        const filePath = await exportWordCV(CV);

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", `attachment; filename=${CV.name}_CV.docx`);
      
        res.send(filePath)
        return;

    }
    res.status(400).json({message:"Unsupported format , only PDF & Word are allowed"})

    res.download(filePath,(err)=>{
        try {     
            if(err){
                return res.status(409).json({message:"error with download",err})
            }
        } catch (error) {
            res.status(500).json({message:"export failed!"})
        }
    })
}