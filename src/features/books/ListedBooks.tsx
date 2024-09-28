import * as React from 'react';
import { useEffect, useState } from 'react';
import BookCard from '@/components/books/BookCard'; 
import { getListedBooks } from '@/services/BookService'; 
import { Book } from '@/types/book';
import { Typography } from '@mui/joy';
import BookSearch from "@/features/search/components/BookSearch";
import { useAuthContext } from "@/context/AuthContext";

export default function BookList() {

  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }

  const [books, setBooks] = useState<Book[]>([]); // State to store the list of books
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch listed books for a specific user on component mount
    async function fetchBooks() {
      try {
        const bookList = await getListedBooks(user.email); // Call getListedBooks to get the user's listed books
        setBooks(bookList); // Update state with the book data
      } catch (error) {
        console.error('Error fetching listed books:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }
    
    fetchBooks();
  }, [user.email]); 

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  return (
    <div>
      <Typography level="h1" textAlign={'left'}> 
        My list of books
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
