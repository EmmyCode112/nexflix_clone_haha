import React from "react";
import "./Home.css";
import Navbar from "@/components/Nav/Navbar";
import Hero from "../../components/Hero/Hero";
import MovieSection from "../../components/Hero/MovieSection";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <MovieSection />
      <Footer />
    </div>
  );
};

export default Home;
