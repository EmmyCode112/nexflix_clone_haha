import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // Import the 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // TailwindCSS plugin is correctly placed here
  ],
  resolve: {
    // The 'resolve' object should be a top-level property
    alias: {
      // Set up the alias.
      // '@' will resolve to the 'src' directory of your project.
      // You can change 'src' to 'your-project-root' if needed.
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
