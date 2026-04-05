import React, { useState, useEffect } from "react";
import AccessibleSlider from "./AccessibleSlider";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowRight } from "lucide-react";

function findYearsToReachGoal({ monthlySIP, returnRate, targetFutureValue }) {
  const annualRate = returnRate / 100;
  const r = annualRate / 12;
  const maxYears = 50;

  if (monthlySIP <= 0) return null;

  for (let months = 12; months <= maxYears * 12; months += 12) {
    if (r === 0) {
      const fv = monthlySIP * months;
      if (fv >= targetFutureValue) {
        return months / 12;
      }
    } else {
      const factor = Math.pow(1 + r, months);
      const fv = monthlySIP * ((factor - 1) / r) * (1 + r);
      if (fv >= targetFutureValue) {
        return months / 12;
      }
    }
  }

  return null;
}

export default function WhatIfSimulator({ base, years }) {
  const [sipAdjustment, setSipAdjustment] = useState(0);
  const [returnAdjustment, setReturnAdjustment] = useState(0);
  const [timelineExtension, setTimelineExtension] = useState(0);
  const [insight, setInsight] = useState("");

  useEffect(() => {
    if (!base) return;

    const baseYears = years;
    const baseMonthlySIP = base.monthlySIP;
    const baseReturnRate = base.returnRate;
    const targetFutureValue = base.futureGoalValue;

    const newMonthlySIP = baseMonthlySIP + sipAdjustment * 1000;
    const newReturnRate = baseReturnRate + returnAdjustment;
    const extendedYears = baseYears + timelineExtension;

    const yearsWithHigherSIP = findYearsToReachGoal({
      monthlySIP: newMonthlySIP,
      returnRate: baseReturnRate,
      targetFutureValue
    });

    if (yearsWithHigherSIP && yearsWithHigherSIP < baseYears) {
      const diff = (baseYears - yearsWithHigherSIP).toFixed(1);
      setInsight(
        `If you increase your SIP by ₹${(
          sipAdjustment * 1000
        ).toLocaleString("en-IN")} you could potentially reach this goal about ${diff} years earlier.`
      );
      return;
    }

    if (timelineExtension > 0) {
      setInsight(
        `Extending the goal by ${timelineExtension} years may significantly lower your required monthly SIP for the same target value.`
      );
      return;
    }

    if (returnAdjustment > 0) {
      setInsight(
        `If long-term returns are higher by ${returnAdjustment.toFixed(
          1
        )}%, your required SIP could be lower — but remember, higher returns usually involve higher risk.`
      );
      return;
    }

    setInsight(
      "Use the sliders to explore how changes to your SIP amount, expected returns, or time horizon might affect goal achievement."
    );
  }, [base, sipAdjustment, returnAdjustment, timelineExtension, years]);

  if (!base) return null;

  return (
    <section
      aria-labelledby="what-if-heading"
      className="glass-card p-5 lg:p-6 lg:col-span-2"
    >
      <div className="flex items-center gap-2 mb-2">
        <SlidersHorizontal className="w-5 h-5 text-purple-400" />
        <h2
          id="what-if-heading"
          className="text-lg font-bold text-white tracking-wide"
        >
          What-If Simulator
        </h2>
      </div>
      <p className="text-sm text-slate-400 mb-6">
        Adjust these assumptions dynamically to see instantaneous impacts on your plan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AccessibleSlider
          id="sipAdjustment"
          label="Increase SIP (₹/mo)"
          min={0}
          max={25}
          step={1}
          value={sipAdjustment}
          onChange={(e) => setSipAdjustment(Number(e.target.value))}
          helperText="Steps of ₹1,000"
          suffix="K"
        />
        <AccessibleSlider
          id="returnAdjustment"
          label="Adjust Annual Return"
          min={-5}
          max={5}
          step={0.5}
          value={returnAdjustment}
          onChange={(e) => setReturnAdjustment(Number(e.target.value))}
          helperText="Test risk/return variants"
          suffix="%"
        />
        <AccessibleSlider
          id="timelineExtension"
          label="Extend Timeline"
          min={0}
          max={10}
          step={1}
          value={timelineExtension}
          onChange={(e) => setTimelineExtension(Number(e.target.value))}
          helperText="Increase compounding time"
          suffix=" yrs"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={insight}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="bg-surface-200/50 border border-purple-500/20 rounded-xl p-4 flex items-start gap-4"
        >
          <div className="mt-1 flex-shrink-0">
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </div>
          <p
            className="text-sm text-sky-200 font-medium leading-relaxed"
            aria-live="polite"
          >
            {insight}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

