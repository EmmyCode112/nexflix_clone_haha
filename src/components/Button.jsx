import React, { useState } from "react";

// Your Button component
export const Button = ({ label, onClick, className = "", icon }) => {
  return (
    <button
      onClick={onClick}
      // Ensure default classes are applied and then overridden by className
      className={`
        border-0 outline-0  flex items-center text-[15px] cursor-pointer
        ${className}
      `}
    >
      {icon && <img src={icon} alt="" className="w-[25px] h-[25px]" />}
      {label}
    </button>
  );
};
