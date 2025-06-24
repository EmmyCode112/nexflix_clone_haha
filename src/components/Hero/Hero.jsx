import React from "react";
import "./Hero.css";
import Hero_banner from "@/assets/hero_banner.jpg";
import Hero_title from "@/assets/Hero_title.png";
import play from "@/assets/Play_icon.png";
import info from "@/assets/info_icon.png";
import { Button } from "@/components/Button";
import Cards from "../Cards/Cards";
const Hero = () => {
  return (
    <div className="w-full relative hero">
      <img src={Hero_banner} alt="" className="w-full banner" />
      <div className="content absolute bottom-0  w-full  text-white ">
        <img
          src={Hero_title}
          alt=""
          className="w-[90%] md:max-w-[420px] mb-8 title"
        />
        <p className="max-w-[700px] text-[17px]">
          Discovery his ties to a secret ancient order, a young man living in
          modern istanbul embarks on a quest to save the city from an immortal
          enemy.
        </p>
        <div className="flex gap-[10px] btns">
          <Button
            className="text-black hover:bg-[#ffffffbf] transition-all duration-300 gap-2.5  font-semibold bg-white rounded-md cursor-pointer btn"
            label="play"
            icon={play}
          />
          <Button
            className="text-white hover:bg-[#6d6d6e66] transition-all duration-300 gap-2.5  font-semibold bg-[#6d6d6eb3] rounded-md cursor-pointer btn"
            label="More Info "
            icon={info}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
