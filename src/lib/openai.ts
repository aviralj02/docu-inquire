import { db } from "@/db";
import OpenAI from "openai";

async function fetchOpenAIKey(userId: string) {
  try {
    const apiKeyRecord = await db.key.findFirst({
      where: {
        userId: userId,
      },
    });
    if (apiKeyRecord) {
      return apiKeyRecord.openAiKey;
    } else {
      throw new Error("No OpenAI API key found");
    }
  } catch (error) {
    console.error("Error fetching OpenAI API key:", error);
    throw error;
  }
}

export const openai = async (userId: string) => {
  const apiKey = await fetchOpenAIKey(userId);
  return new OpenAI({ apiKey });
};
