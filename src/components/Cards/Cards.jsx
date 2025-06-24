import React from "react";
import "./Cards.css";
import cards_data from "@/assets/cards/Cards_data"; // cards_data is imported but not used in this snippet
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
const Cards = ({ title, category }) => {
  // You had this section commented out, which means you're relying on browser's native overflow scrolling
  // and Tailwind's scrollbar-hide, which is fine.
  // const cardRef = React.useRef(null);
  // React.useEffect(
  //   () => {
  //     const element = cardRef.current;
  //     if (element) {
  //       const handleWheel = (event) => {
  //         event.preventDefault();
  //         element.scrollLeft += event.deltaX; // Changed deltaY to deltaX for horizontal wheel scrolling
  //       };
  //       element.addEventListener("wheel", handleWheel);
  //       return () => {
  //         element.removeEventListener("wheel", handleWheel);
  //       };
  //     }
  //   },
  //   []
  // );

  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  // FIX 1: Removed the leading hyphen from imageUrl
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWU2ZDc5MjEyMGQyYjI1YzQ4ZDA5ODdjZDFiMzk4NSIsIm5iZiI6MTc1MDE2MzEwNC41MjEsInN1YiI6IjY4NTE1ZWEwZjhjMjhjODJhZWI2ZTA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G_mR7mIP0P3yFjo-JSscW7Ix4S5aWfdQvxViRR4fTEw",
    },
  };

  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    )
      .then((res) => {
        if (!res.ok) {
          // Check if response was successful
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.results) {
          setMovies(res.results);
        } else {
          console.error("API response missing 'results' array:", res);
        }
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []); // Empty dependency array means this runs once on mount

  // These console logs are good for debugging and show data is being fetched
  console.log("Movies:", movies);
  console.log(
    "Movies titles (from fetched data):",
    movies.map((movie) => movie.title)
  );

  return (
    <div className="cards-component">
      {" "}
      {/* Added some default styling for better visibility */}
      <h2 className="font-semibold">{title}</h2>
      <div
        className="flex gap-2.5 overflow-x-scroll scrollbar-hide" // Added some padding-bottom for scrollbar-hide to ensure content isn't cut
        // ref={cardRef} // Uncomment this and the useRef/useEffect above if you want custom wheel scrolling
      >
        {movies.length > 0 ? (
          movies.map((card) => (
            <div
              className="relative flex-shrink-0 w-[240px]"
              key={card.id}
              onClick={() => navigate(`/watch/${card.id}`)}
            >
              <img
                className="w-full  rounded-lg cursor-pointer shadow-md transform hover:scale-105 transition-transform duration-200"
                src={imageUrl + card.poster_path} // Often poster_path is better for card display than backdrop_path
                alt={card.title || "Movie Poster"} // FIX 2: Used card.title for alt text and added a fallback
                // Add an onerror to handle broken image links gracefully
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/240x360/cccccc/333333?text=No+Image";
                }}
              />
              <p className="absolute bottom-2 left-2 right-2 text-white bg-black bg-opacity-70 text-sm p-1 rounded-md text-center">
                {card.title}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Loading movies or no movies found...</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
