import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

export default function GoalTimeline({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      aria-labelledby="timeline-heading"
      className="glass-card p-5 lg:p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-sky-400" />
        <h2
          id="timeline-heading"
          className="text-lg font-bold text-white tracking-wide"
        >
          Journey to Goal
        </h2>
      </div>
      
      {/* Scrollable container for timeline */}
      <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
          className="relative pl-3"
        >
          {/* Vertical line */}
          <div className="absolute top-2 bottom-2 left-4 w-px bg-slate-700/50" />

          <ol className="space-y-6 relative">
            {data.map((item) => (
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                key={item.year}
                className="flex items-start gap-4 relative z-10"
              >
                <div className={`mt-0.5 w-[10px] h-[10px] rounded-full flex-shrink-0 border-2 ${item.isFinal ? 'bg-green-400 border-green-500 shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'bg-surface-200 border-primary shadow-[0_0_5px_rgba(34,76,135,0.8)]'}`} />
                <div className="flex-1 bg-surface-200/50 rounded-xl p-3 border border-white/5 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-white flex items-center gap-2">
                      Year {item.year}
                      {item.isFinal && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    </p>
                    {item.isFinal && (
                      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-400 border border-green-500/20 uppercase tracking-widest">
                        Goal Achieved
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Portfolio Value: <span className="font-semibold text-sky-300">{item.portfolioFormatted}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Total Invested: {item.investedFormatted}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

