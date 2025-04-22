import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function grammarCheck (grammarText:String):Promise<{
    Spelling:String[],
    Punctuation:String[],
    Style:String[]
}>{
    const prompt = `
    
 You are a grammar checker. The user will give you CV content and your job is to check for grammar, spelling, and style issues.

Return only a valid JSON in this format (DO NOT ADD ANY MARKDOWN or extra text):

{
  "Spelling": [
    "recieved → received",
    "alot → a lot"
  ],
  "Punctuation": [
    "however → however,"
  ],
  "Style": [
    "very good → excellent"
  ]
}

Now analyze this CV content:
${grammarText}
`;

    const response = await openai.chat.completions.create({
        model:"gpt-4o-mini",
        messages:[
            {role:"system",content:"you are a professional grammar checker"},
            {role:"user",content:prompt}
        ],
        temperature:0.3
    })

    const resultText = response.choices[0].message?.content || ""

    const cleaned = resultText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

const parsed = JSON.parse(cleaned);

    return{
        Spelling:parsed.Spelling || [],
        Punctuation:parsed.Punctuation || [],
        Style:parsed.Style || []

    }

}