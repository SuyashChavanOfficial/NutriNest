import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to={"/"}>
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
            NutriNest
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to={"/signin"}
            className="px-5 py-2 rounded-xl font-medium text-white 
  bg-white/10 border border-white/20 backdrop-blur-md
  hover:bg-white/20 hover:border-white/30 
  transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};
