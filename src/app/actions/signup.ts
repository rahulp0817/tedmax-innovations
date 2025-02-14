'use server'
import bcrypt from "bcryptjs";
import { SignupSchema } from "@/lib/schema";
import prisma from "@/db";
import { z } from "zod";
import { getUserByEmail } from "@/db/user";


export const register = async (values: z.infer<typeof SignupSchema>) => {
  const validateFields = SignupSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid fields"
    }
  }

  const { name, email, password } = validateFields.data;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })


  return { success: "User Created!" }
}