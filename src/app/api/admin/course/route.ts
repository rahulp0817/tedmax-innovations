import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { z } from 'zod'

const requestBodySchema = z.object({
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

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const {
    price,
    duration,
    category,
    instructor,
    title,
    imageUrl,
    description,
    id
  } = parseResult.data;

  await prisma.course.create({
    data: {
      //@ts-ignore
      price,
      duration,
      category,
      instructor,
      title,
      imageUrl,
      description,
      id: parseInt(id, 10),
    },
  });

  return NextResponse.json({
    message: "Course created successfully",
    success: true,
  }, { status: 200 })
}