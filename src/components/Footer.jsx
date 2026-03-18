import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div>
        <>
          <h1>NutriNest</h1>
          <p>The Heart of Fitness</p>
        </>
        <div className="">
          <Link>Instagram</Link>
          <Link>Youtube</Link>
          <Link>Facebook</Link>
          <Link>LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
};
