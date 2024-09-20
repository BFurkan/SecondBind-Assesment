# Book Inventory Management System

A web-based book inventory system built with **React**, **Node.js**, and **PostgreSQL**. This system allows users to add, filter, and export books from the inventory.

## Features

- **Add New Books**: Add book details such as title, author, genre, publication date (as text), and ISBN.
- **Filter/Search Books**: Search books by title, author, genre, or publication date.
- **Export Data**: Export the book inventory as CSV or JSON files.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [PostgreSQL](https://www.postgresql.org/download/)
- npm or yarn (comes with Node.js)

## Installation

### 1. Clone the repository:
```
git clone https://github.com/BFurkan/SecondBind-Assesment.git
cd SecondBind-Assesment
```
2. Install dependencies for the backend (in the project root):
```
npm install
```
3. Install dependencies for the frontend (inside the /book-inventory folder):

```
cd book-inventory
npm install
```

## Database Setup
### 1. Create a PostgreSQL database:

CREATE DATABASE book_inventory;

### 3. Update PostgreSQL configuration:
In the server.js file, update the PostgreSQL connection details:

```
const pool = new Pool({
  user: 'your_postgres_username',
  host: 'localhost',
  database: 'book_inventory',
  password: 'your_postgres_password',
  port: 5432,
});
```

Running the Application
1. Start the backend server:
In the project root SecondBind-Assesment folder, run the following command:
```
node server.js
```
The backend server will run on http://localhost:3001.

2. Start the frontend server:
Navigate to the /client directory and start the frontend:
```
npm start
```
The frontend app will run on http://localhost:3000.

API Endpoints
POST /books
Description: Add a new book to the inventory.
Request Body: { title, author, genre, publication_date, isbn }
GET /books
Description: Filter books based on query parameters.
Query Parameters: title, author, genre, publication_date (all optional).
GET /export
Description: Export the inventory data as a CSV file.
GET /export-json
Description: Export the inventory data as a JSON file.
Usage
1. Add a New Book:
Fill out the form fields (Title, Author, Genre, Publication Date as text, ISBN).
Click the Add Book button to add the book to the inventory.
2. Filter/Search Books:
Use the search form to filter books by title, author, genre, or publication date.
The table will display filtered results or all records by default.
3. Export Data:
Click the Download CSV or Download JSON buttons to export the book inventory.
Dependencies
Backend:
express: Fast, unopinionated web framework for Node.js.
pg: PostgreSQL client for Node.js.
cors: Enable CORS.
axios: Promise-based HTTP client.
Frontend:
react: JavaScript library for building user interfaces.
@mui/material: Material-UI components for a clean interface.
@mui/icons-material: Material icons for enhanced UI.
axios: Promise-based HTTP client.
Known Issues
The publication date is entered as a string (VARCHAR). Ensure consistency when entering dates.
