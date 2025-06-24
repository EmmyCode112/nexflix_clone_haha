import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component that controls access to routes based on authentication status.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @param {boolean | null} props.isAuthenticated - True if user is authenticated, false if not, null if loading.
 * @param {boolean} props.loadingAuth - True if authentication state is still loading.
 * @returns {React.ReactNode} The protected content or a redirection.
 */
const ProtectedRoute = ({ children, isAuthenticated, loadingAuth }) => {
  // While authentication state is being determined, show nothing or a loading spinner
  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading authentication...
      </div>
    );
  }

  // If the user is authenticated, render the children (the protected route content)
  if (isAuthenticated) {
    return children;
  }

  // If the user is not authenticated and loading is complete, redirect to the sign-in page
  return <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
