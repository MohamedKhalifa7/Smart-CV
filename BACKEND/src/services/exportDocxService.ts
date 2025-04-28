import { Document,Packer,Paragraph,TextRun } from "docx";
const path = require("path")
const fs = require("fs")


async function exportWordCV(CV:any):Promise<Buffer>{
    const skillsText = CV.skills? Object.values(CV.skills).flat().join(", "):"no skills listed "
    const doc = new Document({
        sections:[
            {
            children:[
                new Paragraph({
                    children:[
                        new TextRun({text:"Personal",bold:true}),
                        new TextRun({break:1}),
                        new TextRun(`Name:${CV.name}`),
                        new TextRun({break:1}),
                        new TextRun(`Email:${CV.email}`),
                        
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Experience",bold:true}),
                        new TextRun({break:1}),
                        ...CV.experience.map((exp:any)=>{
                            new TextRun({text:`${exp.role} at ${exp.company} (${exp.years})`,break:1})
                        })
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Education",bold:true}),
                        new TextRun({break:1}),
                        new TextRun(`University:${CV.university}`), 
                        new TextRun({break:1}),    
                        new TextRun(`Degree:${CV.degree}`),     
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Skills",bold:true}),
                        new TextRun({break:1}),
                        new TextRun(skillsText),     
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Languages",bold:true}),
                        new TextRun({break:1}),
                        ...CV.languages.map((lang:any)=>{
                            new TextRun({text:`${lang.name} : ${lang.degree}`,break:1})
                        })     
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Certifications",bold:true}),
                        new TextRun({break:1}),
                        ...CV.certifications.map((cert:any)=>{
                            new TextRun({text:`${cert.name} from :  ${cert.company} (${cert.years})`,break:1})
                        })     
                    ]
                })
            ]
          }
        ]

    })

    const buffer = await Packer.toBuffer(doc)
    const outPath = path.join(__dirname,"../exports",(CV.name) ? CV.name.replace(/\s+/g,"-") : "default" + "_CV.docx")
    const dirPath = path.dirname(outPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    
    fs.writeFileSync(outPath,buffer)
    return outPath;
}

export default exportWordCV


