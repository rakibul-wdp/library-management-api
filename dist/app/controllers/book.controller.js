"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const zod_1 = require("zod");
const createBookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().min(0),
    available: zod_1.z.boolean().optional(),
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = createBookSchema.parse(req.body);
        const book = yield book_model_1.Book.create(validatedData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        const query = filter ? { genre: filter } : {};
        const sortOption = {
            [sortBy]: sort === "desc" ? -1 : 1,
        };
        const page = parseInt(req.query.page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (page - 1) * limitNum;
        const [books, total] = yield Promise.all([
            book_model_1.Book.find(query).sort(sortOption).skip(skip).limit(limitNum),
            book_model_1.Book.countDocuments(query),
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
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving books",
            success: false,
            error,
        });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving book",
            success: false,
            error,
        });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, {
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
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating book",
            success: false,
            error,
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting book",
            success: false,
            error,
        });
    }
});
exports.deleteBook = deleteBook;
