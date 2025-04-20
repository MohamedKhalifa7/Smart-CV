import mammoth from "mammoth";
import pdfParse from "pdf-parse"
import fs from "fs"

export const extractText = async(filePath:string,mimeType:string):Promise<string>=>{

    if(mimeType==="application/pdf"){
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer)
        return data.text
    }

    if (mimeType==="application/msword"){

       const result = await mammoth.extractRawText({path:filePath})
       return result.value
    }

    throw new Error("this file is unsupported , please upload pdf/word ")

}