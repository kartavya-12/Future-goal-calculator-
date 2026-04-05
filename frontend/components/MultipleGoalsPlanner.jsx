import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";

const PIE_COLORS = ["#38bdf8", "#818cf8", "#c084fc", "#fb7185", "#34d399"];

function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-200/95 backdrop-blur-xl border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-white font-semibold text-sm mb-1">{payload[0].name}</p>
        <span className="text-sky-300 font-bold">
          {formatCurrency(payload[0].value)} / month
        </span>
      </div>
    );
  }
  return null;
};

export default function MultipleGoalsPlanner({ goals }) {
  const activeGoals = goals.filter(
    (g) => g.results && g.results.monthlySIP > 0
  );

  if (activeGoals.length === 0) {
    return (
      <section
        aria-labelledby="multi-goals-heading"
        className="glass-card p-5 lg:p-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2
            id="multi-goals-heading"
            className="text-lg font-bold text-white tracking-wide"
          >
            Portfolio Planner
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Compute multiple goals to activate your aggregated portfolio view and SIP distribution breakdown.
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
      className="glass-card p-5 lg:p-6 relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="flex items-center gap-2 mb-2 relative z-10">
        <Layers className="w-5 h-5 text-indigo-400" />
        <h2
          id="multi-goals-heading"
          className="text-lg font-bold text-white tracking-wide"
        >
          Portfolio Planner
        </h2>
      </div>
      <p className="text-sm text-slate-400 mb-6 relative z-10">
        Total Aggregate SIP Required:{" "}
        <span className="font-bold text-sky-300 text-lg ml-1">
          {formatCurrency(totalMonthlySIP)}
        </span>
      </p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="h-64 relative z-10"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              stroke="none"
              labelLine={false}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                  className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="middle" 
              align="right"
              layout="vertical"
              wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}

