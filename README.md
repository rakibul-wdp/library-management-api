# Library Management API

A RESTful API for managing books and borrowing operations, built with Express, TypeScript, and MongoDB.

## Features

- Book management (CRUD operations)
- Borrowing system with quantity tracking
- Genre-based filtering and sorting
- Data validation and error handling
- TypeScript support with proper typing
- MongoDB aggregation for reporting

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB (with Mongoose)
- Zod (for validation)
- Bcrypt (for password hashing)

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas cluster)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rakibul-wdp/library-management-api.git
cd library-management-api
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/library-management
PORT=5000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## API Endpoints

### Books

#### Create a Book

- **POST** `/api/books`
- **Request Body:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380199",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

#### Get All Books

- **GET** `/api/books`
- **Query Parameters:**
  - `filter` - Filter by genre (e.g., `FICTION`)
  - `sortBy` - Field to sort by (default: `createdAt`)
  - `sort` - Sort direction (`asc` or `desc`, default: `desc`)
  - `limit` - Number of results (default: 10)

#### Get Single Book

- **GET** `/api/books/:bookId`

#### Update Book

- **PUT** `/api/books/:bookId`
- **Request Body:**

```json
{
  "copies": 10
}
```

#### Delete Book

- **DELETE** `/api/books/:bookId`

### Borrowing

#### Borrow a Book

- **POST** `/api/borrow`
- **Request Body:**

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Get Borrowed Books Summary

- **GET** `/api/borrow`
- **Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error message",
  "success": false,
  "error": {
    // Detailed error information
  }
}
```

## Environment Variables

| Variable      | Description               | Default                                        |
| ------------- | ------------------------- | ---------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/library-management` |
| `PORT`        | Server port               | `5000`                                         |

## Project Structure

```
src/
├── app/
│   ├── controllers/    # Route controllers
│   ├── interfaces/     # TypeScript interfaces
│   ├── models/         # Mongoose models
│   └── validations/    # Validation schemas
├── app.ts              # Express application setup
└── server.ts           # Server entry point
```

## Development Scripts

- `npm run dev` - Start development server with hot-reload
- `npm build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
