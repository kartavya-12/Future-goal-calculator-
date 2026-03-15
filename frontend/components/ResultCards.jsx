import React from "react";
import { motion } from "framer-motion";

function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export default function ResultCards({ results, years }) {
  if (!results) {
    return (
      <section
        aria-labelledby="results-heading"
        className="mt-6"
      >
        <h2
          id="results-heading"
          className="sr-only"
        >
          Results
        </h2>
      </section>
    );
  }

  const { futureGoalValue, monthlySIP, totalInvestment, wealthGenerated } =
    results;

  const cards = [
    {
      title: "Future goal cost (inflation-adjusted)",
      value: formatCurrency(futureGoalValue),
      description:
        "Estimated cost of your goal when you actually need the money."
    },
    {
      title: "Required monthly SIP",
      value: formatCurrency(monthlySIP),
      description: "Approximate monthly investment to stay on track."
    },
    {
      title: "Total amount invested",
      value: formatCurrency(totalInvestment),
      description: `Total money you invest over ${years} years.`
    },
    {
      title: "Estimated wealth created",
      value: formatCurrency(wealthGenerated),
      description:
        "Potential growth from compounding over the full investment period."
    }
  ];

  return (
    <section
      aria-labelledby="results-heading"
      className="mt-6"
    >
      <h2
        id="results-heading"
        className="text-lg font-semibold text-primary mb-3"
      >
        Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.article
            key={card.title}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              {card.title}
            </h3>
            <p className="text-xl font-bold text-primary mb-1">
              {card.value}
            </p>
            <p className="text-xs text-neutral">{card.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

