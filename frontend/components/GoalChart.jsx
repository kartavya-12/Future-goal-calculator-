import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

function formatShortCurrency(value) {
  if (value == null) return "";
  if (value >= 1_00_00_000) {
    return `${(value / 1_00_00_000).toFixed(1)} Cr`;
  }
  if (value >= 1_00_000) {
    return `${(value / 1_00_000).toFixed(1)} L`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)} K`;
  }
  return value.toFixed(0);
}

export default function GoalChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      aria-labelledby="growth-chart-heading"
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
    >
      <h2
        id="growth-chart-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        Investment growth vs goal value
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="yearLabel"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickFormatter={formatShortCurrency}
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0
                }).format(value)
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="invested"
              name="Total invested"
              stroke="#224c87"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="portfolio"
              name="Investment value"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="goalValue"
              name="Goal cost (inflation-adjusted)"
              stroke="#da3832"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}

