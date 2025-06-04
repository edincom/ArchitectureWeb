import { PrismaClient } from "@prisma/client";
import { json } from "@solidjs/router";
import  type { APIEvent } from '@solidjs/start/server';
import { z } from "zod";
import { generateQuestions } from "~/lib/ai";

const prisma = new PrismaClient();

const cardSchema = z.object({
  title: z.string(),
  category: z.string(),
  content: z.string(),
  owner: z.string(),
});

export async function POST(event: APIEvent) {
  try {
    const body = await event.request.json();
    const card = cardSchema.parse(body);
    const question_data = await generateQuestions(card.content);
    const newCard = await prisma.cards.create({
      data: {
        title: card.title,
        category: card.category,
        owner: card.owner,
        shared: true,
        content: question_data,
      },
    });
    return json({ message: "Card created", card: newCard }, { status: 201 });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    return json(
      { error: error.message || "Failed to generate card" },
      { status: 400 }
    );
  }
}
