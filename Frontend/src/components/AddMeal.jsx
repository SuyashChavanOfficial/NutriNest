import React, { useEffect, useState } from "react";
import { foodOptions } from "../helper/foodOptions";
import api from "../api/api"; // ✅ ADDED: import api

export const AddMeal = ({ isOpen, onClose, defaultType }) => {
  const [type, setType] = useState(defaultType || "Breakfast");
  const [items, setItems] = useState([{ food: "", quantity: "", unit: "" }]);
  const [loading, setLoading] = useState(false); // ✅ ADDED: loading state

  useEffect(() => {
    if (isOpen) {
      setType(defaultType || "Breakfast");
      setItems([{ food: "", quantity: "", unit: "" }]);
    }
  }, [defaultType, isOpen]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([...items, { food: "", quantity: "", unit: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length === 1) return;

    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    if (field === "food") {
      const selected = foodOptions.find((f) => f.name === value);
      updated[index].unit = selected ? selected.unit : "";
    }

    setItems(updated);
  };

  // ✅ ADDED: MAIN FUNCTION TO SAVE MEAL + ITEMS
  const handleSave = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create Meal
      const mealResponse = await api.post("/meals", {
        meal_type: type.toLowerCase(), // backend expects lowercase
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      });

      const mealId = mealResponse.data.id;

      // 2️⃣ Create Meal Items (loop)
      const validItems = items.filter((item) => item.food && item.quantity);

      await Promise.all(
        validItems.map((item) =>
          api.post(`/meals/${mealId}/meal_items`, {
            food_name: item.food.toLowerCase(),
            quantity: Number(item.quantity),
            unit: item.unit,
          }),
        ),
      );

      // 3️⃣ Close modal after success
      onClose();

      // (Optional) You can trigger refresh from parent later
    } catch (error) {
      console.error("Error saving meal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-xl">
        <h2 className="text-white text-xl font-semibold mb-6">
          Add Meal Entry
        </h2>

        <div className="space-y-5">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-[#0F172A] border border-white/10 text-white rounded-lg px-3 py-2"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </select>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  list={`food-list-${index}`}
                  value={item.food}
                  onChange={(e) => handleChange(index, "food", e.target.value)}
                  placeholder="Search food..."
                  className="flex-1 bg-[#0F172A] border border-white/10 text-white rounded-lg px-3 py-2"
                />
                <datalist id={`food-list-${index}`}>
                  {foodOptions.map((f, i) => (
                    <option key={i} value={f.name} />
                  ))}
                </datalist>

                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(index, "quantity", e.target.value)
                  }
                  className="w-20 bg-[#0F172A] border border-white/10 text-white rounded-lg px-2 py-2"
                />

                <span className="text-gray-400 text-sm w-10">{item.unit}</span>

                <button
                  onClick={() => handleRemoveItem(index)}
                  disabled={items.length === 1}
                  className={`px-2 ${
                    items.length === 1
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-red-400 hover:text-red-500"
                  }`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddItem}
            className="text-sm text-[#22C55E] hover:underline"
          >
            + Add Item
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave} // ✅ ADDED: connect save function
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"} {/* ✅ ADDED */}
          </button>
        </div>
      </div>
    </div>
  );
};
