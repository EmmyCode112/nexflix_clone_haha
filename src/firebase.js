// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAh4iGLXYIbyriACr1wz55t4McuH3ayaF4",
  authDomain: "my-netflix-clone-552b3.firebaseapp.com",
  projectId: "my-netflix-clone-552b3",
  storageBucket: "my-netflix-clone-552b3.firebasestorage.app",
  messagingSenderId: "818869673668",
  appId: "1:818869673668:web:1fd016f61361641d6af391",
  measurementId: "G-5CZK68544C",
};
// Initialize Firebase using global variables provided by the Canvas environment
const appId =
  typeof firebaseConfig.appId !== "undefined"
    ? firebaseConfig.appId
    : "default-app-id";
const rawFirebaseConfig =
  typeof firebaseConfig !== "undefined" ? String(firebaseConfig) : ""; // Ensure it's a string
try {
  if (rawFirebaseConfig.trim() !== "") {
    // Only try to parse if not empty
    firebaseConfig = JSON.parse(rawFirebaseConfig);
  } else {
    console.warn(
      "Firebase configuration (__firebase_config) is empty. Using default empty config."
    );
  }
} catch (error) {
  console.error(
    "Error parsing __firebase_config. Using default empty config.",
    error
  );
  // If parsing fails, firebaseConfig remains an empty object
}

// Basic validation for firebaseConfig. This might not cause a 500 but will lead to Firebase init errors.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn(
    "Firebase configuration is incomplete. Some Firebase services might not initialize correctly."
  );
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const initializeAuth = async () => {
  try {
    if (typeof __initial_auth_token !== "undefined" && __initial_auth_token) {
      await signInWithCustomToken(auth, __initial_auth_token);
      console.log("Signed in with custom token.");
    } else {
      await signInAnonymously(auth);
      console.log("Signed in anonymously.");
    }
  } catch (error) {
    console.error("Error during initial Firebase authentication:", error);
  }
};

const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await addDoc(
      collection(db, `artifacts/${appId}/users/${user.uid}/user_data`),
      {
        uid: user.uid,
        name: name,
        email: email,
        authProvider: "local",
      }
    );
    console.log("User signed up successfully:", user);
    toast.success("User signed up successfully!");
    // Optionally, you can return the user object or any other relevant data
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(
      error.code.split("/")[1].split("-").join(" ") ||
        "Failed to sign up. Please try again."
    );
    throw error;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in successfully:", user);
    toast.success("User signed in successfully!");
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error(
      error.code.split("/")[1].split("-").join(" ") ||
        "Failed to sign in. Please check your credentials."
    );
    throw error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    toast.success("User signed out successfully!");
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Failed to sign out. Please try again.");
    throw error;
  }
};

export { auth, db, signUp, signIn, logOut, onAuthStateChanged, initializeAuth };
