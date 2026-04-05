import React from "react";
import { Lightbulb, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function InsightsPanel({ results, years, goalLabel }) {
  if (!results) return null;

  const { futureGoalValue, totalInvestment, wealthGenerated } = results;

  const growthPercentage =
    totalInvestment > 0 ? (wealthGenerated / totalInvestment) * 100 : 0;

  return (
    <section
      aria-labelledby="insights-heading"
      className="glass-card p-5 lg:p-6 relative overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl" />
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Lightbulb className="w-5 h-5 text-amber-400" />
        <h2
          id="insights-heading"
          className="text-sm font-bold text-slate-200 uppercase tracking-wider"
        >
          Smart Assistant
        </h2>
      </div>

      <motion.ul 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="space-y-4 relative z-10"
      >
        <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 }}} className="flex gap-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed">
            You will invest <span className="font-bold text-white">{formatCurrency(totalInvestment)}</span> over <span className="font-bold text-white">{years} years</span> to work towards a goal currently estimated to cost <span className="font-bold text-white">{formatCurrency(futureGoalValue)}</span>{goalLabel ? ` (${goalLabel})` : ""}.
          </p>
        </motion.li>
        
        <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 }}} className="flex gap-3">
          <TrendingUpIcon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed">
            Your investment could potentially grow by around <span className="font-bold text-green-400">{growthPercentage.toFixed(0)}%</span> due to compounding, assuming returns meet your expectations.
          </p>
        </motion.li>
        
        <motion.li variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 }}} className="flex gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-500/70 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-400 leading-relaxed italic">
            These numbers are estimates to assist your planning. They do not represent any guarantee or product recommendation.
          </p>
        </motion.li>
      </motion.ul>
    </section>
  );
}

// Inline helper for missing icon if needed
function TrendingUpIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  )
}

