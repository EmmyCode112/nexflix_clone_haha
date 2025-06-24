import React from "react";
import "./Player.css";
import backArrow from "@/assets/back_arrow_icon.png"; // Importing back arrow image
import { useParams, useNavigate } from "react-router-dom";
const Player = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const handleBack = () => {
    navigate("/"); // Navigate back to home page
  };

  const { movieId } = useParams(); // Replace with actual movie ID or get it from props or context
  console.log("Movie ID:", movieId); // Log the movie ID for debugging
  const [movieDetails, setMovieDetails] = React.useState({
    name: "",
    published_at: "",
    type: "",
    key: "",
  });

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
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setMovieDetails(res.results[0]))
      .catch((err) => console.error(err));
  }, [movieId]);

  console.log(movieDetails);
  return (
    <div className="playerContainer h-[100vh] w-full flex flex-col items-center justify-center">
      <img
        src={backArrow}
        alt="back to home"
        className="w-[50px] cursor-pointer absolute left-[20px] top-[20px]"
        onClick={handleBack} // Handle back navigation
      />
      <iframe
        width={"90%"}
        height={"90%"}
        src={`https://www.youtube.com/embed/${movieDetails.key}?autoplay=1&mute=1`}
        frameBorder="0"
        title="trailer"
        allowFullScreen
        className="rounded-[10px] shadow-lg "
      ></iframe>
      <div className="flex items-center justify-between w-[90%] ">
        <p>{movieDetails.published_at.slice(0, 10)} </p>
        <p>{movieDetails.name}</p>
        <p>{movieDetails.type}</p>
      </div>
    </div>
  );
};

export default Player;
