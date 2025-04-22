import { Request, Response } from "express";
import { grammarCheck } from "../services/grammarService";

export const GrammarController = async(req:Request,res:Response)=>{

    const {grammarText} = req.body

    if(!grammarText){
        res.status(409).json({message:"no valid text"})
        return;
    }

    const result = await grammarCheck(grammarText)
    res.status(200).json(result)
    return;



}