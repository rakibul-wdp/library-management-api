import { Document, Model } from "mongoose";

export type BookGenre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: BookGenre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookModelStatic extends Model<IBook> {
  updateAvailability(bookId: string): Promise<void>;
}
