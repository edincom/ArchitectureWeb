import { PrismaClient } from "@prisma/client";
import { action, query } from "@solidjs/router";
import { z } from 'zod'

const prisma = new PrismaClient();

const flashcardSchema = z.object({
    title : z.string(),
    owner : z.string(),
    category : z.string(),
    shared : z.boolean(),
    content: z.record(z.any())

})


//Get all the stak from the database
export const getCards = query(async() => {
    'use server'
    return await prisma.cards.findMany({
        select: {
            id :true,
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

//Add a stak to the database
export const addCard = query(async(form : FormData, extraData : any) => {
    'use server'
    const content = extraData.content
    const flashcard = flashcardSchema.parse({
        title : form.get('title'),
        owner : "edincomor@gmail.com",
        category : form.get('category'),
        shared : true,
        content : content
    })
    return await prisma.cards.create({data : flashcard})
}, 'addCard')





//Get the staks from a specific user from the database
export const getCardsUser = query(async(owner : string) => {
    'use server'
    return await prisma.cards.findMany({where : {owner}})
}, 'getCardsUser')

export const getCardsUserAdtion = action(getCardsUser)

//Delete a stak from the database from its id
export const deleteCards = query(async(id: string)=>{
    'use server'
    return await prisma.cards.delete({where: {id}})
}, 'deleteCards')

export const deleteCardsAction = action(deleteCards);

//Get a random question from a specific stak from the database
export const getQuestion = query(async(id : string) =>{
    'use server'
    const json = await prisma.cards.findUnique({where : {id}})
    const content = json?.content
    console.log(content)
    return content
}, 'getQuestion')

export const getQuestionAction = action(getQuestion)

