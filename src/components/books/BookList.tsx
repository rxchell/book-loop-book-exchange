import * as React from 'react';
import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { getAllBooks } from '@/services/BookService';
import { Book } from '@/types/book';
import { Typography } from '@mui/joy';
import BookSearch from "@/features/search/components/BookSearch";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]); // State to store the list of books
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch all books on component mount
    async function fetchBooks() {
      try {
        const bookList = await getAllBooks(); // Call getAllBooks to get the data
        setBooks(bookList); // Update state with the book data
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }
    
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <div>

      <Typography level="h3" textAlign={'left'}> 
        List of books
      </Typography>

      <BookSearch books={books} onSetFilter={setBooks} /> {/* Render the BookSearch component */}
      
      {books.length > 0 ? (
        books.map((book, index) => (
          <BookCard key={index} {...book} /> // Render each book as a BookCard
        ))
      ) : (
        <div>No books available.</div> // Message when no books are found
      )}
    </div>
  );
}
