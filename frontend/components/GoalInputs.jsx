import React from "react";
import AccessibleSlider from "./AccessibleSlider";

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
      className="bg-white rounded-xl shadow-md p-6 lg:p-8 border border-gray-100"
    >
      <h2
        id="goal-inputs-heading"
        className="text-lg font-semibold text-primary mb-4"
      >
        Goal Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="goalType"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Goal type
          </label>
          <select
            id="goalType"
            name="goalType"
            value={form.goalType}
            onChange={handleTextChange("goalType")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {GOAL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="goalName"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Goal name (optional)
          </label>
          <input
            id="goalName"
            name="goalName"
            type="text"
            value={form.goalName}
            onChange={handleTextChange("goalName")}
            placeholder="E.g. Child’s MSc in 2038"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Current cost of goal (₹)
          </label>
          <input
            id="cost"
            name="cost"
            type="number"
            min="0"
            value={form.cost}
            onChange={handleChange("cost")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <AccessibleSlider
            id="years"
            label="Years to goal"
            min={1}
            max={40}
            step={1}
            value={form.years}
            onChange={handleChange("years")}
            helperText="How many years from now do you want to achieve this goal?"
            suffix=" yrs"
          />
        </div>

        <div className="md:col-span-2">
          <AccessibleSlider
            id="inflation"
            label="Expected inflation rate (%)"
            min={0}
            max={15}
            step={0.5}
            value={form.inflation}
            onChange={handleChange("inflation")}
            helperText="Average rise in cost of this goal per year."
            suffix="%"
          />
        </div>

        <div className="md:col-span-2">
          <AccessibleSlider
            id="returnRate"
            label="Expected annual return (%)"
            min={1}
            max={20}
            step={0.5}
            value={form.returnRate}
            onChange={handleChange("returnRate")}
            helperText="Long-term return you expect from your investments."
            suffix="%"
          />
        </div>
      </div>
    </section>
  );
}

