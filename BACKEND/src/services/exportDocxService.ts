import { Document,Packer,Paragraph,TextRun } from "docx";
const path = require("path")
const fs = require("fs")


async function exportWordCV(CV:any){
    const doc = new Document({
        sections:[
            {
            children:[
                new Paragraph({
                    children:[
                        new TextRun({text:"Personal",bold:true}),
                        new TextRun({text:CV.name}),
                        new TextRun({text:CV.email}),
                        
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Experience",bold:true}),
                        ...CV.experience.map((exp:any)=>{
                            new TextRun(`${exp.role} at ${exp.company} (${exp.years})`)
                        })
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Education",bold:true}),
                        new TextRun({text:CV.university}),     
                        new TextRun({text:CV.degree}),     
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Skills",bold:true}),
                        new TextRun(CV.Skills.join(", ")),     
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Languages",bold:true}),
                        ...CV.languages.map((lang:any)=>{
                            new TextRun(`${lang.name} : ${lang.degree}`)
                        })     
                    ]
                }),
                new Paragraph({
                    children:[
                        new TextRun({text:"Certifications",bold:true}),
                        ...CV.certifications.map((cert:any)=>{
                            new TextRun(`${cert.name} from :  ${cert.company} (${cert.years})`)
                        })     
                    ]
                })
            ]
          }
        ]

    })

    const buffer = await Packer.toBuffer(doc)
    const outPath = path.join(__dirname,"../exports",`${CV.name}_CV.Docx`)

    fs.writeFileSync(outPath,buffer)
    return outPath
}

export default exportWordCV


