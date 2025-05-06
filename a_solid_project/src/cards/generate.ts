import { z } from 'zod';
import { PrismaClient } from '@prisma/client'
import { action, redirect } from '@solidjs/router';
import { generateQuestions } from './ai';

const prisma = new PrismaClient();
export const cardSchema = z.object({
    title: z.string(),
    category: z.string(),
    content: z.string(),
    prompt: z.string(),
})

export async function generate(form: FormData) {
    'use server'
    let card: z.infer<typeof cardSchema>
    try {
        console.log("Hello");
        card = cardSchema.parse(Object.fromEntries(form.entries()));
        console.log("Wow");
        // Requête à IA...
        //fetch('')
        // Stocke
    } catch (err: any) {
        console.error(err);
        throw err;
        //throw new Error('Données invalides')
    }
    const question_data = await generateQuestions(card.content);
    try {
        const newCard = await prisma.cards.create({
            data: {
                title: card.title,
                owner: 'Nothing',
                category: card.category,
                shared: true,
                content: question_data,
            }
        });

        console.log("New stak created");
    } catch (err: any) {
        console.error("Generation:", err);
        throw err;
    }
}

export const generateAction = action(async (formData: FormData) => {
    'use server'
    await generate(formData)
    throw redirect('/')
})