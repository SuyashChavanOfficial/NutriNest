import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 h-15 shadow-lg ">
      <Link to={"/"}>
        <h1 className="font-extrabold">NutriNest</h1>
      </Link>
      <Link
        to={"/signin"}
        className="bg-purple-500 text-white py-2 px-4 rounded-lg"
      >
        Signin
      </Link>
    </nav>
  );
};
