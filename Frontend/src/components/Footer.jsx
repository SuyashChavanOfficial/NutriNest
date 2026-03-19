import { Link } from "react-router-dom";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-white/10 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute w-60 h-60 bg-[#22C55E]/10 blur-3xl rounded-full top-0 left-10"></div>
      <div className="absolute w-60 h-60 bg-[#8B5CF6]/10 blur-3xl rounded-full bottom-0 right-10"></div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold text-white">
            Nutri<span className="text-[#22C55E]">Nest</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">The Heart of Fitness 💚</p>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 text-gray-400">
          <Link to="#" className="hover:text-[#22C55E] transition duration-300">
            <FaInstagram size={20} />
          </Link>

          <Link to="#" className="hover:text-[#3B82F6] transition duration-300">
            <FaYoutube size={20} />
          </Link>

          <Link to="#" className="hover:text-[#8B5CF6] transition duration-300">
            <FaFacebook size={20} />
          </Link>

          <Link to="#" className="hover:text-[#22C55E] transition duration-300">
            <FaLinkedin size={20} />
          </Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-xs pb-4">
        © {new Date().getFullYear()} NutriNest. All rights reserved.
      </div>
    </footer>
  );
};
