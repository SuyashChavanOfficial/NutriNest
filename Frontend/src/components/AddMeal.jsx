import React, { useState } from "react";
import { foodOptions } from "../helper/foodOptions";

export const AddMeal = ({ isOpen, onClose }) => {
  const [type, setType] = useState("Breakfast");
  const [items, setItems] = useState([{ food: "", quantity: "", unit: "" }]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems([...items, { food: "", quantity: "", unit: "" }]);
  };

  const handleRemoveItem = (index) => {
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
            <option>Snack</option>
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
                  className="text-red-400 hover:text-red-500 px-2"
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

          <button className="flex-1 py-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
