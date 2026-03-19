import { Coffee, Cookie, Moon, Utensils } from "lucide-react";

export const MealEntry = ({ type, calories, items }) => {
  const mealTypeIcon = {
    Breakfast: <Coffee size={18} />,
    Lunch: <Utensils size={18} />,
    Dinner: <Moon size={18} />,
    Snacks: <Cookie size={18} />,
  };
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#111827] flex items-center justify-center text-white text-sm">
            {mealTypeIcon[type] || "❓"}
          </div>

          <div>
            <h3 className="text-white font-medium">{type}</h3>
            <p className="text-gray-400 text-xs">{items?.length || 0} items</p>
          </div>
        </div>

        <div className="text-[#22C55E] font-semibold">{calories || 0} kcal</div>
      </div>

      <div className="space-y-2">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <span className="text-gray-300">{item.name}</span>

              <div className="flex items-center gap-3">
                <span className="text-gray-400">{item.calories} kcal</span>

                <button className="text-red-400 hover:text-red-500 transition">
                  ✕
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No items added</p>
        )}
      </div>
    </div>
  );
};
