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

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query = filter ? { genre: filter } : {};
    const sortOption: Record<string, 1 | -1> = {
      [sortBy as string]: sort === "desc" ? -1 : 1,
    };
    const page = parseInt(req.query.page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (page - 1) * limitNum;

    const [books, total] = await Promise.all([
      Book.find(query).sort(sortOption).skip(skip).limit(limitNum),
      Book.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: {
        books,
        total,
        page,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books",
      success: false,
      error,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book",
      success: false,
      error,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating book",
      success: false,
      error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting book",
      success: false,
      error,
    });
  }
};
