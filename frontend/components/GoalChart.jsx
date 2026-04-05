import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";
import { LineChart as ChartIcon } from "lucide-react";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-200/95 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300">{entry.name}:</span>
            <span className="text-white font-bold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
              }).format(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function GoalChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      aria-labelledby="growth-chart-heading"
      className="glass-card p-5 lg:p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg border border-white/5">
          <ChartIcon className="w-5 h-5 text-blue-400" />
        </div>
        <h2
          id="growth-chart-heading"
          className="text-lg font-bold text-white tracking-wide"
        >
          Investment Growth Portfolio
        </h2>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="yearLabel"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              tickFormatter={formatShortCurrency}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Area
              type="monotone"
              dataKey="portfolio"
              name="Portfolio Value"
              stroke="#38bdf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPortfolio)"
            />
            <Area
              type="monotone"
              dataKey="invested"
              name="Total Invested"
              stroke="#94a3b8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInvested)"
            />
            <Area
              type="monotone"
              dataKey="goalValue"
              name="Target Goal"
              stroke="#da3832"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}

