"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/books", book_controller_1.createBook);
app.get("/api/books", book_controller_1.getAllBooks);
app.get("/api/books/:bookId", book_controller_1.getBookById);
app.put("/api/books/:bookId", book_controller_1.updateBook);
app.delete("/api/books/:bookId", book_controller_1.deleteBook);
app.post("/api/borrow", borrow_controller_1.borrowBook);
app.get("/api/borrow", borrow_controller_1.getBorrowedBooksSummary);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management App");
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({
            message: "Something went wrong from entire app!",
            error,
        });
    }
});
exports.default = app;
