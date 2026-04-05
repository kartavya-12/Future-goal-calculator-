import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import GoalInputs from "./GoalInputs";
import ResultCards from "./ResultCards";
import GoalChart from "./GoalChart";
import InflationChart from "./InflationChart";
import GoalTimeline from "./GoalTimeline";
import InsightsPanel from "./InsightsPanel";
import MultipleGoalsPlanner from "./MultipleGoalsPlanner";
import WhatIfSimulator from "./WhatIfSimulator";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function buildYearlyData({ years, results, form }) {
  if (!results) return { growthData: [], inflationData: [], timeline: [] };

  const { monthlySIP, futureGoalValue } = results;
  const annualRate = form.returnRate / 100;
  const r = annualRate / 12;
  const inflationRate = form.inflation / 100;
  const growthData = [];
  const inflationData = [];
  const timeline = [];

  for (let year = 1; year <= years; year += 1) {
    const months = year * 12;
    let portfolio = 0;
    if (r === 0) {
      portfolio = monthlySIP * months;
    } else {
      const factor = Math.pow(1 + r, months);
      portfolio = monthlySIP * ((factor - 1) / r) * (1 + r);
    }
    const invested = monthlySIP * months;
    const goalValue = form.cost * Math.pow(1 + inflationRate, year);

    growthData.push({
      year,
      yearLabel: `Y${year}`,
      invested,
      portfolio,
      goalValue
    });
    inflationData.push({
      year,
      yearLabel: `Y${year}`,
      goalValue
    });

    timeline.push({
      year,
      investedFormatted: formatCurrency(invested),
      portfolioFormatted: formatCurrency(portfolio),
      isFinal: year === years
    });
  }

  // Ensure final year goal matches computed futureGoalValue for consistency
  if (growthData.length > 0) {
    const last = growthData[growthData.length - 1];
    last.goalValue = futureGoalValue;
    inflationData[inflationData.length - 1].goalValue = futureGoalValue;
  }

  return { growthData, inflationData, timeline };
}

export default function CalculatorForm() {
  const [form, setForm] = useState({
    goalType: "Education",
    goalName: "",
    cost: 1000000,
    years: 10,
    inflation: 6,
    returnRate: 12
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/calculate-goal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          goalType: form.goalType,
          goalName: form.goalName,
          cost: form.cost,
          years: form.years,
          inflation: form.inflation,
          returnRate: form.returnRate
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to calculate goal.");
      }

      const data = await response.json();
      const enriched = {
        ...data,
        returnRate: form.returnRate,
        futureGoalValue: data.futureGoalValue
      };
      setResults(enriched);
      setGoalsList((prev) => [
        ...prev,
        {
          goalType: form.goalType,
          goalName: form.goalName,
          results: enriched
        }
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { growthData, inflationData, timeline } = buildYearlyData({
    years: form.years,
    results,
    form
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative"
      aria-describedby="calculator-disclaimer"
    >
      {/* Left Sidebar - Inputs */}
      <div className="lg:col-span-4 space-y-6">
        <GoalInputs form={form} onChange={setForm} />
        
        <div className="glass-card p-6 sticky top-[calc(100vh-160px)]">
          <p className="text-sm text-slate-400 mb-4 text-center">
            Ready to see your customized plan?
          </p>
          <motion.button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-primary px-6 py-4 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:from-blue-500 hover:to-blue-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-200 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            <Calculator className="w-5 h-5" />
            {loading ? "Computing Trajectory..." : "Calculate SIP Plan"}
          </motion.button>
          
          <AnimatePresence>
            {error && (
              <motion.p
                role="alert"
                className="mt-4 text-sm text-center text-red-400 font-medium bg-red-400/10 py-2 px-3 rounded-lg border border-red-500/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <section
          id="calculator-disclaimer"
          className="mt-6 bg-surface-200/50 border border-white/5 rounded-xl p-4 shadow-sm"
          aria-label="Important disclaimer"
        >
          <p className="text-[11px] text-slate-500 leading-relaxed italic">
            This tool has been designed for information purposes only. Actual
            results may vary depending on various factors involved in capital
            market. Investor should not consider above as a recommendation for any
            schemes of HDFC Mutual Fund. Past performance may or may not be
            sustained in future and is not a guarantee of any future returns.
          </p>
        </section>
      </div>

      {/* Right Content - Results */}
      <div className="lg:col-span-8">
        {!results && (
          <div className="h-full flex flex-col items-center justify-center min-h-[400px] glass-card border-dashed border-white/20">
            <Calculator className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-medium text-slate-400">Awaiting Input</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-sm text-center">
              Configure your goal details on the left and calculate your SIP plan to see detailed visualizations and insights.
            </p>
          </div>
        )}

        <AnimatePresence>
          {results && (
            <motion.div
              key="results-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 lg:space-y-8"
            >
              <ResultCards results={results} years={form.years} />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <GoalChart data={growthData} />
                <InflationChart data={inflationData} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <InsightsPanel
                    results={results}
                    years={form.years}
                    goalLabel={form.goalName || form.goalType}
                  />
                  <WhatIfSimulator base={results} years={form.years} />
                </div>
                <div className="lg:col-span-1">
                  <GoalTimeline data={timeline} />
                </div>
              </div>

              <MultipleGoalsPlanner goals={goalsList} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

