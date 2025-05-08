import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
import { action, redirect } from '@solidjs/router';
import { generateQuestions } from './ai';
import path from 'path';

const prisma = new PrismaClient();
export const cardSchema = z.object({
    title: z.string(),
    category: z.string(),
    content: z.string(),
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
  
    try {
      const newCard = await prisma.cards.create({
        data: {
          title: card.title,
          owner: 'edincomor@gmail.com',
          category: card.category,
          shared: true,
          content: question_data,
        }
      });
  
      console.log("✅ New card created:", newCard);
  
      // DEBUG: Log DB file location
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