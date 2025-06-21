import express, { Application, NextFunction, Request, Response } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "./app/controllers/book.controller";
import {
  borrowBook,
  getBorrowedBooksSummary,
} from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

app.post("/api/books", createBook);
app.get("/api/books", getAllBooks);
app.get("/api/books/:bookId", getBookById);
app.put("/api/books/:bookId", updateBook);
app.delete("/api/books/:bookId", deleteBook);

app.post("/api/borrow", borrowBook);
app.get("/api/borrow", getBorrowedBooksSummary);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Library Management App");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Something went wrong from entire app!",
      error,
    });
  }
});

export default app;
