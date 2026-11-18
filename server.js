const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' }
];
let nextId = 4;

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get single book
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id, 10));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Create book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  const newBook = { id: nextId++, title: title.trim(), author: author.trim() };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update book
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id, 10));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title.trim();
  if (author) book.author = author.trim();

  res.json(book);
});

// Delete book
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const [deleted] = books.splice(index, 1);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
