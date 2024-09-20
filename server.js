const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'book_inventory',
    password: '123456',
    port: 5432,
});

//Add New Book
app.post('/books', async (req, res) => {
  const { title, author, genre, publication_date, isbn } = req.body;

  try {
    const isbnExists = await pool.query('SELECT * FROM Inventory WHERE isbn = $1', [isbn]);

    if (isbnExists.rows.length > 0) {
      return res.status(400).json({ message: 'ISBN already exists' });
    }
    const newBook = await pool.query(
      'INSERT INTO Inventory (title, author, genre, publication_date, isbn) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, genre, publication_date, isbn]
    );
    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});


//Filter Book
app.get('/books', async (req, res) => {
    const { title, author, genre, publication_date } = req.query;
    
    let query = 'SELECT * FROM Inventory WHERE 1=1';
    const params = [];
    
    if (title) {
      params.push(`%${title}%`);
      query += ` AND title ILIKE $${params.length}`;
    }
    if (author) {
      params.push(`%${author}%`);
      query += ` AND author ILIKE $${params.length}`;
    }
    if (genre) {
      params.push(`%${genre}%`);
      query += ` AND genre ILIKE $${params.length}`;
    }
    if (publication_date) {
      params.push(`%${publication_date}%`);
      query += ` AND publication_date ILIKE $${params.length}`;
    }
  
    try {
      // If no filters are provided, return all books
      if (params.length === 0) {
        const allBooks = await pool.query('SELECT * FROM Inventory');
        return res.json(allBooks.rows);
      }
  
      const books = await pool.query(query, params);
      res.json(books.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  
//Export Books to CSV file
  app.get('/export', async (req, res) => {
    try {
      const books = await pool.query('SELECT * FROM Inventory');
      
      let csv = 'ID,Title,Author,Genre,Publication Date,ISBN\n';
      books.rows.forEach(book => {
        csv += `${book.id},${book.title},${book.author},${book.genre},${book.publication_date},${book.isbn}\n`;
      });
      
      res.header('Content-Type', 'text/csv');
      res.attachment('books.csv');

      return res.send(csv);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// Export Books to JSON
app.get('/export-json', async (req, res) => {
    try {
      const books = await pool.query('SELECT * FROM Inventory');
      res.header('Content-Type', 'application/json');
      return res.json(books.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
app.listen(3001, () => 
{
    console.log('Server running on http://localhost:3001');
});