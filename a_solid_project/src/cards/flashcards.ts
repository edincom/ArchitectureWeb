import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function getCardsFromDB(){
    'use server'
    let staks: any[] = [];
    try{
        staks = await prisma.cards.findMany();
    }catch(err){
        console.error("Error", err);
    }
    return staks
}