import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { addNewUser, createUser } from "@/services/UserService";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign up a user with email, password, first name, last name, and username
export default async function signUp(email: string, password: string, firstName: string, lastName: string, username: string) {
  let result = null, // Variable to store the sign-up result
    error = null; // Variable to store any error that occurs

  try {
    result = await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password

    // Update the user's profile with the first and last name
    if (result.user) {
      await updateProfile(result.user, {
      });
      await addNewUser(createUser(email, firstName, lastName, username)); // Add the user to the application's database
    }
    
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-up
  }

  return { result, error }; // Return the sign-up result and error (if any)
}
