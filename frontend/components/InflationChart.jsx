import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";

export default function InflationChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      aria-labelledby="inflation-chart-heading"
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
    >
      <h2
        id="inflation-chart-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        Inflation impact on goal cost
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
              tickFormatter={(v) => v.toFixed(0)}
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
            <Line
              type="monotone"
              dataKey="goalValue"
              name="Estimated goal cost"
              stroke="#da3832"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}

