import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { z } from "zod";

const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().min(0),
  available: z.boolean().optional(),
});

export const createBook = async (req: Request, res: Response) => {
  try {
    const validatedData = createBookSchema.parse(req.body);
    const book = await Book.create(validatedData);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};
