import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { z } from 'zod'

const requestBodySchema = z.object({
  id: z.string(),
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters long.',
  }),
  description: z.string().min(8, {
    message: 'Description must be at least of 8 characters long.',
  }),
  duration: z.number(),
  category: z.string(),
  imageUrl: z.string().url({
    message: 'Invalid URL format for imageUrl.',
  }),
  price: z.number(),
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