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
    getDocs,
    arrayUnion
 } from "firebase/firestore";
import { Book } from "@/types/book";
import { User } from "@/types/user";

const db = getFirestore(firebase_app);

export function generateBookId(): string {
    return uuidv4(); // Generate a random UUID v4
}

// Function to create a new book
export async function addNewBook(bookData: Book): Promise<Book> {
    try {
        const bookDocRef = doc(db, "books", bookData.bookId);

        // Set the book document in Firestore
        await setDoc(bookDocRef, {
            ...bookData,
            createdAt: serverTimestamp(),
        });

        return { ...bookData }; // Return the book data with the assigned bookId
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

export async function updateListedBookRecords(userEmail: string, bookId: string) {
    try {
        const docRef = doc(db, "users", userEmail as string);

        // Add the new book listed to the array of listed books in the user's document
        await updateDoc(docRef, {
            booksListed: arrayUnion(bookId),
        });
    } catch (error) {
        console.error("Error updating book listing records:", error);
        throw error;
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

// Function to retrieve all books listed by a user as Book objects
export async function getListedBooks(userEmail: string): Promise<Book[]> {
    try {
        const docRef = doc(db, "users", userEmail);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const booksListedIds = userData.booksListed || []; // Get the array of book IDs

            // Fetch book details for each book ID
            const books = await Promise.all(
                booksListedIds.map((bookId: string) => retrieveBookById(bookId))
            );

            return books.filter((book) => book !== null) as Book[]; // Filter out any null values and return as Book[]
        } else {
            console.log("No such user document!");
            return []; // Return an empty array if the user does not exist
        }
    } catch (error) {
        console.error("Error retrieving listed books:", error);
        throw error;
    }
}

export async function retrieveBookById(BookId: string): Promise<Book> {
    try {
        const record = await getDoc(doc(db, "books", BookId));

        if (!record.exists()) {
            throw new Error("Book record not found");
        }

        return record.data() as Book;
    } catch (error) {
        console.error("Error retrieving book:", error);
        throw error; // Rethrow the error for handling in the UI or caller function
    }
}
