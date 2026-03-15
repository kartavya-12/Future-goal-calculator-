import React from "react";

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
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
    >
      <h2
        id="insights-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        Smart financial insights
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-xs text-gray-800">
        <li>
          You will invest{" "}
          <span className="font-semibold">
            {formatCurrency(totalInvestment)}
          </span>{" "}
          over{" "}
          <span className="font-semibold">{years} years</span> to work
          towards a goal currently estimated to cost{" "}
          <span className="font-semibold">
            {formatCurrency(futureGoalValue)}
          </span>
          {goalLabel ? ` (${goalLabel})` : ""}.
        </li>
        <li>
          Your investment could potentially grow by around{" "}
          <span className="font-semibold">
            {growthPercentage.toFixed(0)}%
          </span>{" "}
          due to compounding, assuming returns meet your expectations.
        </li>
        <li>
          These numbers are{" "}
          <span className="font-semibold">estimates</span> to assist your
          planning. They do not represent any guarantee or product
          recommendation.
        </li>
      </ul>
    </section>
  );
}

