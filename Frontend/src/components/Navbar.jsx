import React from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ setIsSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          {/* HAMBURGER - mobile only */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden text-white text-xl"
          >
            <FaBars />
          </button>

          <Link to="/">
            <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
              NutriNest
            </h1>
          </Link>
        </div>

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
            <button onClick={handleProfileClick}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold cursor-pointer overflow-hidden">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.first_name?.charAt(0).toUpperCase()
                )}
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
