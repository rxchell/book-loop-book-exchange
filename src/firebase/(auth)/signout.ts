import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

// Function to sign out the current user
export default async function logout() {
  try {
    await signOut(auth); // Sign the user out
  } catch (error) {
    console.error('Error occurred during logout:', error);
    throw error; // Re-throw the error for handling in the component
  }
}
