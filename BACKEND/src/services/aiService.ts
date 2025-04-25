import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function aiResponse(cvText:string):Promise<{
    score: number;
    positiveFeedback: string[];
    neutralFeedback: string[];
    negativeFeedback: string[];
    sectionsToImprove: { section: string; suggestion: string }[];
    atsCheckerNotes: string[];
    matchJobTitle: string;
 }>{

    const prompt = `you are an AI CV analayzer that checks if a resume is compatable with ATS (application tracking system)
    heres the candidates resume text:
    
    ${cvText}

    Based on this, answer:
        Read the CV content below.
       Instructions:
          1. Provide 3 types of feedback: "positive", "neutral", and "negative".
          2. Format the feedback like this:

      {
        "score": 84,
        "positiveFeedback": [
          "Professional summary is well-written and concise",
          "Good use of action verbs in experience descriptions"
        ],
        "neutralFeedback": [
          "Work experience section could include more quantifiable achievements",
          "Consider adding more industry-specific keywords"
        ],
        "negativeFeedback": [
          "Education section is missing graduation dates",
          "Contact information is incomplete"
        ],
        "sectionsToImprove": [
          { "section": "Education", "suggestion": "Include graduation dates for each degree" },
          { "section": "Contact", "suggestion": "Make sure email and phone number are listed clearly" }
        ],
        "atsCheckerNotes": [
          "The CV is ATS-friendly with a simple layout",
          "Avoid using images or graphics that ATS might not read correctly",
          "Match Job Description: Use exact words and phrases from the job posting.
        ],
        "matchJobTitle": "your cv is a not match for the job title, it is a good match for AI engineer"
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
            positiveFeedback: parsed.positiveFeedback || [],
            neutralFeedback: parsed.neutralFeedback || [],
            negativeFeedback: parsed.negativeFeedback || [],
            sectionsToImprove: parsed.sectionsToImprove || [],
            atsCheckerNotes: parsed.atsCheckerNotes || [],
            matchJobTitle: parsed.matchJobTitle || ""
        }
      
}