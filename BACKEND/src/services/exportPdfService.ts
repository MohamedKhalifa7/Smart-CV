import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { ICV } from "../models/cvModel";

  

export const exportPdfCV= async(CV:ICV,templateName:string)=>{

    const templatePath = path.join(__dirname,`../templates/${templateName}.html`);
    const source = fs.readFileSync(templatePath,"utf-8");

    const template = Handlebars.compile(source)
    const rendered = template({
        ...CV,
        skills: CV.skills ? Object.values(CV.skills).flat().join(", ") : ""
    })

    fs.mkdirSync(path.join(__dirname,"../exports"),{recursive:true})

    const filePath = path.join(__dirname,"../exports",`${CV.name}_CV.pdf`);

    const browser = await puppeteer.launch();
    const Page = await browser.newPage();

    await Page.setContent(rendered,{waitUntil:"networkidle0"});
    await Page.pdf({path:filePath,format:"A4"});

    await browser.close();
    return filePath;
    
}