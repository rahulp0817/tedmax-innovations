import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }).max(20, {
    message: "Password must be at most 20 characters long",
  }),
})

export const SignupSchema = z.object({
  name: z.string({
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email address must contain '@' and a valid domain ",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }).max(20, {
    message: "Password must be at most 20 characters long",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
})

export const ProfileSchema = z.object({
  password: z.string().min(4,{
    message: "Password must be at least 6 characters long",
  }).max(20, {
    message: "Password must be at most 20 characters long",
  }),
})

export const CourseSchema = z.object({
  price: z.number(),
  duration: z.number(),
  category: z.string(),
  instructor: z.string(),
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters long.',
  }),
  imageUrl: z.string().url({
    message: 'Invalid URL format for imageUrl.',
  }),
  description: z.string().min(8, {
    message: 'Description must be at least of 8 characters long.',
  }),
  id: z.string(),
})