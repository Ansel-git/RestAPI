const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the Books API!');
});

let books = [
    { bookId: 1, title: "The Charley", author: "Charley", publisher: "publisher1" },
    { bookId: 2, title: "The Rolly", author: "Rolly", publisher: "publisher2" },
    { bookId: 3, title: "The Ansel", author: "Ansel", publisher: "publisher3" },
    { bookId: 4, title: "The Mark", author: "Mark", publisher: "publisher4" }
];

//POST
app.post('/books', (req, res) => {
    const { bookId, title, author, publisher } = req.body;

    // Ensure all fields are provided
    if (!bookId || !title || !author || !publisher) {
        return res.status(400).json({ error: "Missing book fields" });
    }

    const newBook = { bookId, title, author, publisher };
    books.push(newBook);

    res.status(201).json({ message: "Book added", book: newBook });
});

//ALL BOOKS
app.get('/books', (req, res) => {
    res.json(books);
});

//SPECIFIC BY ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.bookId == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

//PATCH
app.patch('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.bookId == req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });

    // Update only provided fields (existing fields are kept)
    books[bookIndex] = { ...books[bookIndex], ...req.body };

    res.json({ message: "Book updated", book: books[bookIndex] });
});

//DELETE
app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.bookId != req.params.id);
    res.json({ message: "Book deleted" });
});

//LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin123') {
        res.json({ message: "Login success" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
