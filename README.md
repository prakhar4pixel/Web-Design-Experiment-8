# Book Collection API (Experiment 8)

A minimal RESTful API built with Node.js and Express for managing a book collection, paired with a simple beige-themed web interface.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- npm

## Setup & Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/books` | List all books |
| `GET` | `/api/books/:id` | Get book by ID |
| `POST` | `/api/books` | Add a new book (`{ "title": "...", "author": "..." }`) |
| `PUT` | `/api/books/:id` | Update book details |
| `DELETE` | `/api/books/:id` | Remove a book |
