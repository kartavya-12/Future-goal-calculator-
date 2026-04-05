import React from "react";
import AccessibleSlider from "./AccessibleSlider";
import { Target, Tag, IndianRupee } from "lucide-react";

const GOAL_TYPES = [
  "Education",
  "House",
  "Car",
  "Wedding",
  "Travel",
  "Custom"
];

export default function GoalInputs({ form, onChange }) {
  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "range" || event.target.type === "number"
        ? Number(event.target.value)
        : event.target.value;
    onChange({ ...form, [field]: value });
  };

  const handleTextChange = (field) => (event) => {
    onChange({ ...form, [field]: event.target.value });
  };

  return (
    <section
      aria-labelledby="goal-inputs-heading"
      className="glass-card p-6 lg:p-8 sticky top-24"
    >
      <div className="flex items-center gap-2 mb-6">
        <Target className="w-5 h-5 text-primary" />
        <h2
          id="goal-inputs-heading"
          className="text-xl font-bold text-white tracking-wide"
        >
          Goal Configuration
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="goalType"
              className="block text-sm font-semibold text-gray-200 mb-1"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="goalType"
                name="goalType"
                value={form.goalType}
                onChange={handleTextChange("goalType")}
                className="w-full rounded-lg bg-surface-100 border border-white/10 px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-colors"
              >
                {GOAL_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-surface-200 text-white">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="goalName"
              className="block text-sm font-semibold text-gray-200 mb-1"
            >
              Goal Title <span className="opacity-50 font-normal">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-500">
                <Tag className="w-4 h-4" />
              </div>
              <input
                id="goalName"
                name="goalName"
                type="text"
                value={form.goalName}
                onChange={handleTextChange("goalName")}
                placeholder="E.g. Child’s MSc in 2038"
                className="w-full rounded-lg bg-surface-100 border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-500 transition-colors"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="cost"
              className="block text-sm font-semibold text-gray-200 mb-1"
            >
              Current Cost (₹)
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                id="cost"
                name="cost"
                type="number"
                min="0"
                value={form.cost}
                onChange={handleChange("cost")}
                className="w-full rounded-lg bg-surface-100 border border-white/10 pl-10 pr-4 py-3 text-lg font-bold text-white focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-2">
          <AccessibleSlider
            id="years"
            label="Investment Duration"
            min={1}
            max={40}
            step={1}
            value={form.years}
            onChange={handleChange("years")}
            helperText="Number of years remaining to achieve this goal."
            suffix=" yrs"
          />

          <AccessibleSlider
            id="inflation"
            label="Expected Inflation Rate"
            min={0}
            max={15}
            step={0.5}
            value={form.inflation}
            onChange={handleChange("inflation")}
            helperText="Average annual rise in the cost of this goal."
            suffix="%"
          />

          <AccessibleSlider
            id="returnRate"
            label="Expected Annual Return"
            min={1}
            max={20}
            step={0.5}
            value={form.returnRate}
            onChange={handleChange("returnRate")}
            helperText="Expected hypothetical long-term portfolio return."
            suffix="%"
          />
        </div>
      </div>
    </section>
  );
}

