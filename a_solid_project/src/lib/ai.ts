import { PrismaClient } from "@prisma/client";
import { action, redirect } from "@solidjs/router";
import OpenAI from "openai";
import { z } from "zod";
import path from 'path';

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface GeneratedContent {
  question_answers: QuestionAnswer[];
}

export async function generateQuestions(userContent: string) {
  const apiKey = process.env.OPENAI_KEY;
  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.deepseek.com",
  });
  const systemPrompt = `
    You are a helpful assistant. The user will provide a text passage (e.g., an article or multiple paragraphs).
    Your task is to read the content and generate a list of multiple question-answer pairs based on it.

    Each question should test comprehension or factual recall from the passage. Each answer should be concise and accurate.

    Return the output strictly as a JSON array of objects with the format:
    
    {
    "question_answers": [
        {
        "question": "Your question here ?",
        "answer": "The correct answer here"
        },
        ...
    ]
    }
    `;
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string; name?: string }> = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userContent },
  ];
  const response = await client.chat.completions.create({
    model: "deepseek-chat",
    messages: messages,
    response_format: { type: "json_object" }
  });
  const parsed = JSON.parse(response.choices[0].message.content ?? "{}") as GeneratedContent;
  console.log(JSON.stringify(parsed, null, 2));
  return parsed;
}


const prisma = new PrismaClient();
export const cardSchema = z.object({
    title: z.string(),
    category: z.string(),
    content: z.string(),
    owner: z.string()
})

export async function generate(form: FormData) {
    'use server';
    let card: z.infer<typeof cardSchema>;
    try {
      console.log("🟡 Starting form parsing...");
      card = cardSchema.parse(Object.fromEntries(form.entries()));
      
      console.log("🟢 Form parsed successfully:", card);
    } catch (err: any) {
      console.error("🔴 Zod validation failed:", err);
      throw err;
    }
    const question_data = await generateQuestions(card.content);
    console.log("🧠 Generated questions:", question_data);
    console.log(card.owner)
    try {
      const newCard = await prisma.cards.create({
        data: {
          title: card.title,
          owner: card.owner,
          category: card.category,
          shared: true,
          content: question_data,
        }
      });
      console.log("✅ New card created:", newCard);
      console.log("📁 Using database file from:", process.env.DATABASE_URL);
      console.log("🔍 Full resolved DB path:", path.resolve(process.env.DATABASE_URL?.replace("file:", "") ?? "UNKNOWN"));
    } catch (err: any) {
      console.error("❌ Error during Prisma create:", err);
      throw err;
    }
}

export const generateAction = action(async (formData: FormData) => {
    'use server'
    await generate(formData)
    throw redirect('/')
})