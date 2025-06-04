import { PrismaClient } from "@prisma/client";
import { action, query } from "@solidjs/router";
import { z } from 'zod'

const prisma = new PrismaClient();

const flashcardSchema = z.object({
    title: z.string(),
    owner: z.string(),
    category: z.string(),
    shared: z.boolean(),
    content: z.object({
        question_answers: z.array(z.object({
            question: z.string(),
            answer: z.string()
        }))
    })

})

export const getCards = query(async () => {
    'use server'
    return await prisma.cards.findMany({
        select: {
            id: true,
            title: true,
            owner: true,
            content: true
        }
    })
}, 'getCards')


//Get a card by its ID
export const getCardById = query(async (id: string) => {
    'use server';
    return await prisma.cards.findUnique({ where: { id } });
}, 'getCardById');

//Get user info from the DB
export const getUserInfo = query(async (email: string) => {
    'use server';
    return await prisma.user.findUnique({ where: { email } });
}, 'getUserInfo');



//Get the staks from a specific user from the database
export const getCardsUser = query(async (owner: string) => {
    'use server'
    return await prisma.cards.findMany({ where: { owner } })
}, 'getCardsUser')

export const getCardsUserAction = action(getCardsUser)


//Delete a stak from the database from its id
export const deleteCards = query(async (id: string) => {
    'use server'
    return await prisma.cards.delete({ where: { id } })
}, 'deleteCards')

export const deleteCardsAction = action(deleteCards);



// Add a function modify the user data (phone number, Name, Profession)
export const updateUserInfo = async (form: FormData) => {
    'use server'

    const email = form.get("email") as string;
    const name = form.get("name") as string;
    const phone = form.get("phone") as string;
    const profession = form.get("profession") as string;

    await prisma.user.update({
        where: { email },
        data: { name, phone, profession }
    });
};

export const updateUserInfoAction = action(updateUserInfo);
