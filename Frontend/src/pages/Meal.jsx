import { useEffect, useState } from "react";
import { MealEntry } from "../components/MealEntry";
import api from "../api/api";
import { AddMeal } from "../components/AddMeal";

export const Meal = () => {
  const [mealEntries, setMealEntries] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Breakfast");

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

  // Filter logic
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

  const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];

  return (
    <div className="bg-[#0F172A] p-6 w-full min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Meal Log</h1>
            <p className="text-gray-400 text-sm mt-1">
              Track your daily intake
            </p>
          </div>

          {/* TOTAL CALORIES (moved here) */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3 text-center min-w-[140px]">
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Today
            </p>
            <p className="text-xl font-bold text-[#22C55E]">
              {mealEntries.reduce((acc, m) => acc + m.calories, 0)} kcal
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS (moved below) */}
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

        {/* FILTER TABS */}
        <div className="flex gap-3 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-[#22C55E] text-white"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* MEAL LIST */}
        <div className="grid grid-cols-2 gap-4">
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

      {/* MODAL */}
      <AddMeal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        defaultType={selectedType}
      />
    </div>
  );
};
