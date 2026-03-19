import { useEffect, useState } from "react";
import { MealEntry } from "../components/MealEntry";
import api from "../api/api";
import { AddMeal } from "../components/AddMeal";

export const Meal = () => {
  const [mealEntries, setMealEntries] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getMealEntries = async () => {
    try {
      const response = await api.get("/meals");

      if (response) {
        setMealEntries(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMealEntries();
  }, []);

  return (
    <div className=" bg-[#0F172A] p-6 w-full">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Meal Log</h1>
            <p className="text-gray-400 text-sm mt-1">
              Track your daily intake
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Today’s Total
            </p>
            <p className="text-2xl font-bold text-[#22C55E]">
              {mealEntries.reduce((acc, m) => acc + m.calories, 0)} kcal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-4">
              <h2 className="text-white font-medium mb-4">Quick Add</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="meal-button">Breakfast</button>
                <button className="meal-button">Lunch</button>
                <button className="meal-button">Dinner</button>
                <button className="meal-button">Snack</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setOpenModal(true)}
                className="flex-1 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium transition-all duration-300 shadow-md shadow-green-500/10"
              >
                Add Food Entry
              </button>

              <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                AI Snap Food
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {mealEntries.map((entry, index) => (
              <MealEntry
                key={index}
                type={entry.type}
                calories={entry.calories}
                items={entry.items}
              />
            ))}
          </div>
        </div>
      </div>
      <AddMeal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};
