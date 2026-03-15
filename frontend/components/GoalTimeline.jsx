import React from "react";

export default function GoalTimeline({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      aria-labelledby="timeline-heading"
      className="bg-white rounded-xl shadow-md p-4 border border-gray-100"
    >
      <h2
        id="timeline-heading"
        className="text-sm font-semibold text-gray-900 mb-2"
      >
        Goal achievement timeline
      </h2>
      <ol className="space-y-2">
        {data.map((item) => (
          <li
            key={item.year}
            className="flex items-start gap-3"
          >
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Year {item.year}{" "}
                {item.isFinal && (
                  <span className="ml-1 inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 border border-green-200">
                    Goal year
                  </span>
                )}
              </p>
              <p className="text-xs text-neutral">
                You invest approximately{" "}
                <span className="font-semibold">
                  {item.investedFormatted}
                </span>{" "}
                and your portfolio is worth around{" "}
                <span className="font-semibold">
                  {item.portfolioFormatted}
                </span>
                .
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

