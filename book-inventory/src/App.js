import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';

function App() {
  const [book, setBook] = useState({ title: '', author: '', genre: '', publication_date: '', isbn: '' });
  const [search, setSearch] = useState({ title: '', author: '', genre: '', publication_date: '' });
  const [books, setBooks] = useState([]);

  // Handle input changes for adding a new book
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  // Fetch filtered books from the backend
  const fetchBooks = async () => {
    try {
      const query = `?title=${search.title}&author=${search.author}&genre=${search.genre}&publication_date=${search.publication_date}`;
      const response = await axios.get(`http://localhost:3001/books${query}`);
      setBooks(response.data); 
    } catch (err) {
      console.error(err);
    }
  };

  const addBook = async () => {
    try {
      const newBook = { ...book }; 
      await axios.post('http://localhost:3001/books', newBook);
      window.alert('Book added successfully!');
      setBook({ title: '', author: '', genre: '', publication_date: '', isbn: '' });
    } catch (err) {
      if (err.response && err.response.data.message) {
        window.alert(`Error: ${err.response.data.message}`);
      } else {
        window.alert('An unexpected error occurred. Please try again.');
      }
      console.error(err);
    }
  };

  const downloadCSV = async () => {
    try {
      const response = await axios.get('http://localhost:3001/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'books.csv'); 
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading CSV file', err);
      window.alert('Failed to download CSV');
    }
  };
  

  const downloadJSON = async () => {
    const response = await axios.get('http://localhost:3001/export-json');
    const data = JSON.stringify(response.data, null, 2); // Pretty print JSON
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'books.json'); // Set the download file name
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Container>
      <Typography variant="h4">Add New Book</Typography>
      <TextField name="title" label="Title" value={book.title} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="author" label="Author" value={book.author} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="genre" label="Genre" value={book.genre} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="publication_date" label="Publication Date" value={book.publication_date} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="isbn" label="ISBN" value={book.isbn} onChange={handleChange} fullWidth margin="normal" />
      <Button variant='contained' color="primary" onClick={addBook} style={{ marginTop: '20px' }}>Add Book</Button>

      <Typography variant="h4" style={{ marginTop: '40px' }}>Filter Books</Typography>
      <TextField name="title" label="Title" value={search.title} onChange={handleSearchChange} fullWidth margin="normal" />
      <TextField name="author" label="Author" value={search.author} onChange={handleSearchChange} fullWidth margin="normal" />
      <TextField name="genre" label="Genre" value={search.genre} onChange={handleSearchChange} fullWidth margin="normal" />
      <TextField name="publication_date" label="Publication Date" value={search.publication_date} onChange={handleSearchChange} fullWidth margin="normal" />
      <Button variant='contained' color="primary" onClick={fetchBooks} style={{ marginTop: '20px' }}>Search</Button>

      <Table style={{ marginTop: '40px' }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Publication Date</TableCell>
            <TableCell>ISBN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.isbn}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.publication_date}</TableCell>
              <TableCell>{book.isbn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant='contained' color="secondary" onClick={downloadCSV} style={{ marginTop: '20px' }}>Download CSV</Button>
      <Button variant='contained' color="secondary" onClick={downloadJSON} style={{ marginTop: '20px', marginLeft: '10px' }}>Download JSON</Button>
    </Container>
  );
}

export default App;
