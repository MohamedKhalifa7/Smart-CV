import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function aiResponse(cvText:string):Promise<{score:number;explanation:string}>{

    const prompt = `you are an AI CV analayzer that checks if a resume is compatable with ATS (application tracking system)
    heres the candidates resume text:
    
    ${cvText}

    Based on this, answer:
        1. Read the CV content below.
        2. Is the CV ATS-compatible? Why or why not?
        3. Identify any sections that need improvement (e.g. "Summary", "Experience", "Skills").
        4. Mention formatting, keywords, and structure tips if relevant.
        5. Give it a score from 0 to 100 for ATS compatibility.
        Return the answer in bullets and each bullet store it in JSON format like this for example (DO NOT WRAP IT IN MARKDOWN!) :
            {
  "score": 84,
  "explanation": "• Uses clear section headers\n• Good keyword usage\n• Missing summary section\n• Dates are inconsistent\n•etc..."
}
`;

    const response = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages:[
            {role:"system",content:"you are a professional ATS compliance advisor"},
            {role:"user",content:prompt},
        ],
        temperature:0.3
    })

    const resultText = response.choices[0].message?.content || "";
    
        const parsed = JSON.parse(resultText);
        return {
          score: parsed.score,
          explanation: parsed.explanation
        };
      
}