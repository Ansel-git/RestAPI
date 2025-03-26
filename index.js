// "apiKey": "65cd2ea5-267f-4e46-94e9-f908249e4302"
// "token": "c98f2df3-54ea-42cd-a68d-7a3568d024b1"


const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory data storage
let books = [
    { bookId: 101, title: "The Lost Code", author: "Ethan Hunt", publisher: "CodeWorld" },
    { bookId: 102, title: "AI Revolution", author: "Sarah Connor", publisher: "TechFuture" },
    { bookId: 103, title: "Cyber Wars", author: "John Reese", publisher: "Digital Press" },
    { bookId: 104, title: "Quantum Realm", author: "Jane Doe", publisher: "Science Hub" }
];

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Books API!');
});

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.bookId == req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
    const requiredFields = ["title", "author", "publisher"];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` });
    }
    
    const newBook = {
        bookId: books.length ? books[books.length - 1].bookId + 1 : 101,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher
    };
    books.push(newBook);
    res.status(201).json({ message: "Book added", book: newBook });
});

// Update a book by ID
app.patch('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.bookId == req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
    
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.json({ message: "Book updated", book: books[bookIndex] });
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.bookId == req.params.id);
    if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
    
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted" });
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    if (username === 'admin' && password === 'admin123') {
        res.json({ message: "Login success" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
