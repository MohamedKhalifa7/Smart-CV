import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateAIContent = async (
  jobTitle: string,
  sectionName: string,
  industry: string,
  experience: string,
  retries = 3
): Promise<string> => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates CV content.",
          },
          {
            role: "user",
            content: `Generate a ${sectionName} for a ${jobTitle} in the ${industry} industry with ${experience} experience.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0.3,
        presence_penalty: 0.1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        timeout: 30000,
      }
    );

    const cleanContent = response.data.choices[0].message.content
      .trim()
      .replace(/\*\*/g, "")
      .replace(/\\n/g, " ")
      .replace(/\n/g, " ");

    return cleanContent;
  } catch (error: any) {
    if (retries > 0) {
      await delay(2000);
      return generateAIContent(
        jobTitle,
        sectionName,
        industry,
        experience,
        retries - 1
      );
    }

    const errorMessage = error.response?.data?.error?.message || error.message;
    throw new Error(`OpenAI API Error: ${errorMessage}`);
  }
};
