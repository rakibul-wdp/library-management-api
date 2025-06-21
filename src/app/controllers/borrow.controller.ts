import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { z } from "zod";

const borrowBookSchema = z.object({
  book: z.string(),
  quantity: z.number().min(1),
  dueDate: z.string().datetime(),
});

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const {
      book: bookId,
      quantity,
      dueDate,
    } = borrowBookSchema.parse(req.body);

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    if (book.copies < quantity) {
      return res.status(400).json({
        message: "Not enough copies available",
        success: false,
      });
    }

    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
};

export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving borrowed books summary",
      success: false,
      error,
    });
  }
};
