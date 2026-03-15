import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const PIE_COLORS = ["#224c87", "#22c55e", "#da3832", "#f59e0b", "#6366f1"];

function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function MultipleGoalsPlanner({ goals }) {
  const activeGoals = goals.filter(
    (g) => g.results && g.results.monthlySIP > 0
  );

  if (activeGoals.length === 0) {
    return (
      <section
        aria-labelledby="multi-goals-heading"
        className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
      >
        <h2
          id="multi-goals-heading"
          className="text-sm font-semibold text-gray-900 mb-2"
        >
          Multiple goals planner
        </h2>
        <p className="text-xs text-neutral">
          Add calculations for more than one goal to see how your total
          monthly SIP is distributed.
        </p>
      </section>
    );
  }

  const totalMonthlySIP = activeGoals.reduce(
    (sum, g) => sum + g.results.monthlySIP,
    0
  );

  const pieData = activeGoals.map((g, index) => ({
    name: g.goalName || g.goalType || `Goal ${index + 1}`,
    value: g.results.monthlySIP
  }));

  return (
    <section
      aria-labelledby="multi-goals-heading"
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
    >
      <h2
        id="multi-goals-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        Multiple goals planner
      </h2>
      <p className="text-xs text-neutral mb-2">
        Total monthly SIP across all goals:{" "}
        <span className="font-semibold text-primary">
          {formatCurrency(totalMonthlySIP)}
        </span>
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(value)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

