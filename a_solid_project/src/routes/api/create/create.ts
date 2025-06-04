// src/routes/api/generate.ts
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
    // Parse JSON from request body
    const body = await event.request.json();

    // Validate input using zod
    const card = cardSchema.parse(body);

    // Call your OpenAI-powered generateQuestions
    const question_data = await generateQuestions(card.content);

    // Store in DB
    const newCard = await prisma.cards.create({
      data: {
        title: card.title,
        category: card.category,
        owner: card.owner,
        shared: true,
        content: question_data,
      },
    });

    // Return created card as JSON with 201 status
    return json({ message: "Card created", card: newCard }, { status: 201 });
  } catch (error: any) {
    console.error("Error in /api/generate:", error);
    return json(
      { error: error.message || "Failed to generate card" },
      { status: 400 }
    );
  }
}
