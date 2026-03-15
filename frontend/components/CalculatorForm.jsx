import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      className="space-y-6"
      aria-describedby="calculator-disclaimer"
    >
      <GoalInputs form={form} onChange={setForm} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
        <div className="text-xs text-neutral">
          Fill in the details and click{" "}
          <span className="font-semibold">Calculate SIP</span> to see how much
          you may need to invest every month.
        </div>
        <motion.button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Calculating..." : "Calculate SIP"}
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            className="text-xs text-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {results && (
          <motion.div
            key="results-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <ResultCards results={results} years={form.years} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <GoalChart data={growthData} />
              <InflationChart data={inflationData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <InsightsPanel
                results={results}
                years={form.years}
                goalLabel={form.goalName || form.goalType}
              />
              <WhatIfSimulator base={results} years={form.years} />
              <GoalTimeline data={timeline} />
            </div>

            <MultipleGoalsPlanner goals={goalsList} />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="calculator-disclaimer"
        className="mt-4 bg-neutral/10 border border-neutral/40 rounded-md p-3"
        aria-label="Important disclaimer"
      >
        <p className="text-[11px] text-gray-800 leading-relaxed">
          This tool has been designed for information purposes only. Actual
          results may vary depending on various factors involved in capital
          market. Investor should not consider above as a recommendation for any
          schemes of HDFC Mutual Fund. Past performance may or may not be
          sustained in future and is not a guarantee of any future returns.
        </p>
      </section>
    </form>
  );
}

