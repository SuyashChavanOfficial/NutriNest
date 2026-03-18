import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
            NutriNest
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          {!token && (
            <>
              {location.pathname === "/signin" ? (
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl font-medium text-white 
                  bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300"
                >
                  Sign Up
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="px-5 py-2 rounded-xl font-medium text-white 
                  bg-[#8B5CF6] hover:bg-[#7C3AED] transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl font-medium text-white 
                bg-red-500 hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
