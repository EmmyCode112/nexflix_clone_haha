import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Home from "./Pages/Home/Home";
import Login from "./Pages/Auth/Login";
import Player from "./Pages/Player/Player";
import ProtectedRoute from "./Route/ProtectedRoute"; // Import the ProtectedRoute component
import { auth, onAuthStateChanged, initializeAuth } from "./firebase"; // Import auth and onAuthStateChanged
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import ToastContainer and styles
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading, true/false means logged in/out
  const [loadingAuth, setLoadingAuth] = useState(true); // Tracks if the initial auth state is being loaded
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    // Initialize Firebase Auth specific to the Canvas environment
    initializeAuth();

    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
        console.log("User is authenticated:", user.uid);
        // Redirect to home if they try to access sign-in while already logged in
        if (window.location.pathname === "/sign-in") {
          navigate("/"); // Redirect to home if on sign-in page and logged in
        }
      } else {
        // User is signed out
        setIsAuthenticated(false);
        console.log("User is not authenticated.");
        // If on a protected route and not authenticated, redirect to sign-in
        if (window.location.pathname !== "/sign-in") {
          navigate("/sign-in");
        }
      }
      setLoadingAuth(false); // Auth state has been determined
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [navigate]); // Add navigate to dependency array

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        {/* The sign-in page should always be accessible */}
        <Route path="/sign-in" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loadingAuth={loadingAuth}
            >
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/watch/:movieId"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              loadingAuth={loadingAuth}
            >
              <Player />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
