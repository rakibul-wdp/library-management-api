import { model, Schema } from "mongoose";
import {
  BookGenre,
  IBook,
  BookModelStatic,
} from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, BookModelStatic>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "FICTION",
          "NON_FICTION",
          "SCIENCE",
          "HISTORY",
          "BIOGRAPHY",
          "FANTASY",
        ],
        message: "{VALUE} is not a valid genre",
      },
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Copies count is required"],
      min: [0, "Copies cannot be negative"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.static("updateAvailability", async function (bookId: string) {
  const book = await this.findById(bookId);
  if (book && book.copies <= 0) {
    book.available = false;
    await book.save();
  }
});

bookSchema.pre("save", function (next) {
  if (this.copies <= 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

export const Book = model<IBook, BookModelStatic>("Book", bookSchema);
