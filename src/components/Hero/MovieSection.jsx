import React from "react";
import Cards from "../Cards/Cards";
import "./Hero.css";
const MovieSection = () => {
  return (
    <div className="movieSection">
      <Cards title={"Popular on NetFlix"} category={"popular"} />

      <Cards title={"Now Playing"} category={"now_playing"} />
      <Cards title={"Top Rated"} category={"top_rated"} />
      <Cards title={"Upcoming"} category={"upcoming"} />
      {/* <Cards title={"Top pics for You"} category={""} /> */}
    </div>
  );
};

export default MovieSection;
