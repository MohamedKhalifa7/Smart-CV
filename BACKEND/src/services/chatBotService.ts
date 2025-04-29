import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type PredefinedResponses = {
  [key: string]: string;
};

const predefinedResponses: PredefinedResponses = {
  hello: "Hello! I'm your CV assistant. How can I help you today?",
  hi: "Hi there! I'm here to help with your CV and career questions.",
  "how to write a cv":
    "Here are the key steps to write a CV: 1. Start with contact information 2. Write a compelling professional summary 3. List your work experience 4. Include your education 5. Add relevant skills 6. Keep it concise and professional",
  "what is cv":
    "A CV (Curriculum Vitae) is a detailed document highlighting your professional and academic history. It includes your education, work experience, skills, and achievements.",
};

export const generateChatResponse = async (message: string, chatId: string) => {
  const lowerCaseMessage = message.toLowerCase().trim();

  if (predefinedResponses[lowerCaseMessage]) {
    return predefinedResponses[lowerCaseMessage];
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful career and CV assistant. You help users with career advice, CV writing, and professional development questions.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  const cleanContent = response.choices[0].message?.content
    ?.trim()
    .replace(/\*\*/g, "")
    .replace(/\\n/g, "")
    .replace(/\n/g, "");

  return cleanContent;
};
