import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "@/assets/logo.png";
import dropdownIcon from "@/assets/caret_icon.svg";
import profile_pics from "@/assets/profile_img.png";
import search from "@/assets/search_icon.svg";
import bell from "@/assets/bell_icon.svg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../firebase";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navRef.current.classList.add("navbar--scrolled");
      } else {
        navRef.current.classList.remove("navbar--scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      ref={navRef}
      className="flex justify-between navbar fixed w-full text-[14px] text-[#e5e5e5] z-1 ease-in-out transition-all duration-300"
    >
      <div className="flex items-center gap-[50px] nav-left">
        <img src={logo} alt="" className="w-[90px]" />
        <ul className="flex list-none gap-5">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">TV Shows</li>
          <li className="cursor-pointer">Movies</li>
          <li className="cursor-pointer">New & Popular</li>
          <li className="cursor-pointer">My List</li>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <img src={search} alt="" className="w-5 cursor-pointer" />
        <p>Children</p>
        <img src={bell} alt="" className="w-5 cursor-pointer" />

        <div className="flex items-center gap-2.5 cursor-pointer group relative ">
          <img src={profile_pics} alt="" className="w-[30px] rounded-[4px]" />
          <img src={dropdownIcon} alt="" className="" />

          <div className="absolute hidden w-max group-hover:inline-block top-full right-0 bg-[#191919] text-white rounded z-1 shadow-lg hover:shadow-xl transition-all duration-300 dropdown">
            <p
              onClick={handleLogOut}
              className="text-[13px] cursor-pointer underline"
            >
              Sign out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
