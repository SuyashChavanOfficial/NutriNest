import { useState } from "react";
import api from "../api/api";

export const Goal = () => {
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [goalData, setGoalData] = useState(null);
  const [error, setError] = useState("");

  const handleSaveGoal = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post("/goals", {
        goal_type: goal,
      });

      setGoalData(response.data);
    } catch (err) {
      const res = err.response?.data;

      if (res?.error) {
        setError(res.error);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-semibold text-white">Set Your Goal</h1>
          <p className="text-gray-400 text-sm mt-1">
            Choose your fitness goal and we’ll personalize your plan
          </p>
        </div>

        {/* Dropdown */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <label className="text-sm text-gray-400">Select Goal</label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full mt-2 px-3 py-2 rounded-lg bg-[#111827] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
          >
            <option value="">Choose your goal</option>
            <option value="fat_loss">Fat Loss</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="muscle_building">Muscle Building</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">
            {error}
          </div>
        )}

        {/* Goal Response from Backend */}
        {goalData && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-medium mb-4">
              Your Personalized Target
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs">Calories</p>
                <p className="text-[#22C55E] font-semibold mt-1">
                  {goalData.goal_calorie} kcal/day
                </p>
              </div>

              <div className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs">Goal Type</p>
                <p className="text-white font-semibold mt-1 capitalize">
                  {goalData.goal_type.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveGoal}
            disabled={!goal || loading}
            className={`px-6 py-3 rounded-xl font-medium transition ${
              goal && !loading
                ? "bg-[#22C55E] hover:bg-[#16A34A] text-white"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Save Goal"}
          </button>
        </div>
      </div>
    </div>
  );
};
