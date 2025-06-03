import bcrypt from 'bcryptjs';
import { userSchema } from './registration';
import { getSession } from './session';
import { PrismaClient } from '@prisma/client';
import { action, redirect } from '@solidjs/router';

const prisma = new PrismaClient();



export async function login(form: FormData) {
  'use server'
  console.log("Entered the login function");

  const email = String(form.get('email')).trim().toLowerCase();
  const password = String(form.get('password'));

  console.log("Fetched the data from the form");

  try {
    const record = await prisma.user.findUniqueOrThrow({ where: { email } });
    console.log("Found user:", record);

    if (!record.password) throw new Error("User has no password set");

    const loggedIn = await bcrypt.compare(password, record.password);
    if (!loggedIn) throw new Error("Invalid password");

    if (loggedIn) {
      const session = await getSession();
      await session.update({ email });
      console.log("Cookie saved")
    }
    console.log("Login successful");
    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export const loginAction = action(async (formData: FormData) => {
  'use server'
  await login(formData)
  throw redirect('/')
})
