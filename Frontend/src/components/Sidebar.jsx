import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaDumbbell,
  FaBullseye,
  FaChartPie,
  FaFire,
} from "react-icons/fa";

export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Meal", path: "/meals", icon: <FaUtensils /> },
    { name: "Workout", path: "/workout", icon: <FaDumbbell /> },
    { name: "Goal", path: "/goal", icon: <FaBullseye /> },
    { name: "Summary", path: "/summary", icon: <FaChartPie /> },
    { name: "Calories Burnt", path: "/calories", icon: <FaFire /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0F172A] border-r border-white/10 backdrop-blur-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-8">
        Nutri<span className="text-[#22C55E]">Nest</span>
      </h2>

      <ul className="space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-[#22C55E] text-white shadow-lg shadow-green-500/20"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
