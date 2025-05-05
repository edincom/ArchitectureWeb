import { action, query, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type SessionData = {
    email?: string
}

export function getSession(){
    'use server'
    return useSession<SessionData>({
        password: import.meta.env.VITE_SESSION_SECRET,
    })
}

//Check if the user is connected
export const getUser = query(async () => {
    'use server'
    try {
        const session = await getSession()
        if (!session.data.email) {
            console.log("No session data")
            return "No data"
        }
        console.log("Session data available")
        console.log(session.data.email)
        return await prisma.user.findUniqueOrThrow({
            where: {email: session.data.email},
        })

    }   catch {
        return null
    }
}, 'getUser')

export const logout = async () => {
    'use server'
    const session = await getSession()
    await session.clear()
    console.log("Session terminated")
  }

export const logoutAction = action(async () => {
    'use server'
    await logout()
    throw redirect('/login')
})