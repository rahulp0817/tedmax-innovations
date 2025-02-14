'use server'
import * as z from "zod"
import { LoginSchema } from "@/lib/schema"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password } = validateFields.data

  try {
    await signIn("credentials", {
      username: email,
      password: password,
      redirect: false,
    })

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "An error occurred!" }
      }
    }
    throw error;
  }
}