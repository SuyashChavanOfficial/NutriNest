import { useEffect, useState } from "react";
import { MealEntry } from "../components/MealEntry";
import api from "../api/api";
import { AddMeal } from "../components/AddMeal";

export const Meal = () => {
  const [mealEntries, setMealEntries] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("type_asc");

  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Breakfast");

  const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

  const getMealEntries = async () => {
    try {
      const response = await api.get("/meals/today");
      if (response) {
        setMealEntries(response.data);
        setFilteredMeals(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMealEntries();
  }, []);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredMeals(mealEntries);
    } else {
      setFilteredMeals(
        mealEntries.filter(
          (meal) => meal.type.toLowerCase() === activeFilter.toLowerCase(),
        ),
      );
    }
  }, [activeFilter, mealEntries]);

  useEffect(() => {
    let updatedMeals = [...mealEntries];

    if (activeFilter !== "All") {
      updatedMeals = updatedMeals.filter(
        (meal) => meal.type.toLowerCase() === activeFilter.toLowerCase(),
      );
    }

    if (sortBy === "latest") {
      updatedMeals.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } else if (sortBy === "oldest") {
      updatedMeals.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    } else if (sortBy === "type_asc") {
      updatedMeals.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortBy === "type_desc") {
      updatedMeals.sort((a, b) => b.type.localeCompare(a.type));
    }

    setFilteredMeals(updatedMeals);
  }, [activeFilter, mealEntries, sortBy]);

  return (
    <div className="bg-[#0F172A] p-6 w-full min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Meal Log</h1>
            <p className="text-gray-400 text-sm mt-1">
              Track your daily intake
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-center min-w-[140px]">
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Today
            </p>
            <p className="text-xl font-bold text-[#22C55E]">
              {mealEntries.reduce((acc, m) => acc + m.calories, 0)} kcal
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedType("Breakfast");
              setOpenModal(true);
            }}
            className="flex-1 px-4 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium"
          >
            + Add Meal
          </button>

          <button className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10">
            AI Snap
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="hidden md:flex gap-3 flex-wrap ">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  activeFilter === filter
                    ? "bg-[#22C55E] text-white"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <span className="text-gray-400 text-sm">Filter:</span>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            >
              <option value="All" className="bg-[#111827] text-white">
                All
              </option>
              <option value="Breakfast" className="bg-[#111827] text-white">
                Breakfast
              </option>
              <option value="Lunch" className="bg-[#111827] text-white">
                Lunch
              </option>
              <option value="Dinner" className="bg-[#111827] text-white">
                Dinner
              </option>
              <option value="Snacks" className="bg-[#111827] text-white">
                Snacks
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
            >
              <option value="type_asc" className="bg-[#111827] text-white">
                Meal Type (A-Z)
              </option>
              <option value="type_desc" className="bg-[#111827] text-white">
                Meal Type (Z-A)
              </option>
              <option value="latest" className="bg-[#111827] text-white">
                Time (Latest)
              </option>
              <option value="oldest" className="bg-[#111827] text-white">
                Time (Oldest)
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((entry, index) => (
              <MealEntry
                key={index}
                type={entry.type}
                calories={entry.calories}
                items={entry.items}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-10">
              No meals found for this filter
            </p>
          )}
        </div>
      </div>

      <AddMeal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        defaultType={selectedType}
      />
    </div>
  );
};
