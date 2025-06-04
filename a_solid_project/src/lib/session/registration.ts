import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'
import { action, redirect } from '@solidjs/router';



const prisma = new PrismaClient()
export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(5),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {message: "Invalid phone number format"}),
  profession: z.string()
});


export async function register(form: FormData) {
  'use server';
  let user;

  try {
    user = userSchema.parse({
      email: form.get('email'),
      name: form.get('name'),
      password: form.get('password'),
      phone: form.get('phone'),
      profession: form.get('profession')
    });
  } catch (err) {
    console.error('Invalid data:', err);
    throw new Error('Données invalides');
  }

  user.password = await bcrypt.hash(user.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        profession: user.profession
      }
    });

    console.log("New user created:", newUser.id);
    return { id: newUser.id, email: newUser.email };
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("A user with this email already exists");
    }

    console.error("Registration failed:", err);
    throw err;
  }
}
export const registerAction = action(async (formData: FormData) => {
  'use server'
  await register(formData)
  throw redirect('/login')
})