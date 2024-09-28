import firebase_app from "@/firebase/config";
import { v4 as uuidv4 } from 'uuid';
import { doc, 
    setDoc, 
    getDoc, 
    getFirestore, 
    serverTimestamp, 
    updateDoc,
    query,
    collection, 
    getDocs
 } from "firebase/firestore";
import { Book } from "@/types/book";

const db = getFirestore(firebase_app);

function generateBookId(): string {
    return uuidv4(); // Generate a random UUID v4
}

// Function to create a new book
export async function addNewBook(bookData: Book): Promise<Book> {
    try {
        // Create a unique book ID (You might want to use a more structured ID)
        const bookId = generateBookId();
        const bookDocRef = doc(db, "books", bookId);

        // Set the book document in Firestore
        await setDoc(bookDocRef, {
            ...bookData,
            bookId,
            createdAt: serverTimestamp(),
        });

        return { ...bookData, bookId }; // Return the book data with the assigned bookId
    } catch (error) {
        console.error("Error adding book:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

// Function to retrieve a book by its ID
export async function retrieveBook(bookId: string): Promise<Book> {
    try {
        const bookDoc = await getDoc(doc(db, "books", bookId));

        if (!bookDoc.exists()) {
            throw new Error("Book not found");
        }

        return bookDoc.data() as Book;
    } catch (error) {
        console.error("Error retrieving book:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

// Function to update a book
export async function updateBook(bookId: string, updatedData: Partial<Book>): Promise<void> {
    try {
        const bookDocRef = doc(db, "books", bookId);
        
        // Update the book document with the new data
        await updateDoc(bookDocRef, updatedData);
    } catch (error) {
        console.error("Error updating book:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}

// Function to retrieve all books 
export async function getAllBooks() {
    const q = query(
        collection(db, "books"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Book);
}