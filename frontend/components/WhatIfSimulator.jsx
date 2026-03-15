import React, { useState, useEffect } from "react";
import AccessibleSlider from "./AccessibleSlider";

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
        ).toLocaleString("en-IN")} you could potentially reach this goal about ${diff} years earlier (assuming returns stay the same).`
      );
      return;
    }

    if (timelineExtension > 0) {
      setInsight(
        `If you are comfortable extending the goal by ${timelineExtension} years, you may be able to work with a lower monthly SIP for the same target value.`
      );
      return;
    }

    if (returnAdjustment > 0) {
      setInsight(
        `If actual long-term returns are higher by ${returnAdjustment.toFixed(
          1
        )}% than your base assumption, your required SIP could be lower — but higher returns also usually involve higher risk.`
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
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
    >
      <h2
        id="what-if-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        What-if simulator
      </h2>
      <p className="text-xs text-neutral mb-3">
        Adjust these assumptions to understand how they might impact your
        plan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <AccessibleSlider
          id="sipAdjustment"
          label="Increase SIP (₹ per month)"
          min={0}
          max={25}
          step={1}
          value={sipAdjustment}
          onChange={(e) => setSipAdjustment(Number(e.target.value))}
          helperText="Each step represents ₹1,000."
          suffix="K"
        />
        <AccessibleSlider
          id="returnAdjustment"
          label="Change in annual return (%)"
          min={-5}
          max={5}
          step={0.5}
          value={returnAdjustment}
          onChange={(e) => setReturnAdjustment(Number(e.target.value))}
          helperText="Illustrates impact of higher or lower returns."
          suffix="%"
        />
        <AccessibleSlider
          id="timelineExtension"
          label="Extend timeline (years)"
          min={0}
          max={10}
          step={1}
          value={timelineExtension}
          onChange={(e) => setTimelineExtension(Number(e.target.value))}
          helperText="Longer timelines can reduce required SIP."
          suffix=" yrs"
        />
      </div>
      <p
        className="mt-2 text-xs text-gray-800"
        aria-live="polite"
      >
        {insight}
      </p>
    </section>
  );
}

