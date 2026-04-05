import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Wallet, Coins, Rocket, Target } from "lucide-react";

function formatCurrency(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function AnimatedNumber({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  const display = useTransform(springValue, (current) => formatCurrency(current));

  useEffect(() => {
    if (isInView && value) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function ResultCards({ results, years }) {
  if (!results) return null;

  const { futureGoalValue, monthlySIP, totalInvestment, wealthGenerated } = results;

  const cards = [
    {
      title: "Future Goal Value",
      value: futureGoalValue,
      icon: <Target className="w-5 h-5" />,
      color: "text-blue-400",
      bgBase: "bg-blue-500/10",
      description: "Adjusted for inflation"
    },
    {
      title: "Required Monthly SIP",
      value: monthlySIP,
      icon: <Wallet className="w-5 h-5" />,
      color: "text-green-400",
      bgBase: "bg-green-500/10",
      description: "Appx. monthly investment"
    },
    {
      title: "Total Investment",
      value: totalInvestment,
      icon: <Coins className="w-5 h-5" />,
      color: "text-purple-400",
      bgBase: "bg-purple-500/10",
      description: `Over ${years} years`
    },
    {
      title: "Wealth Generated",
      value: wealthGenerated,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-amber-400",
      bgBase: "bg-amber-500/10",
      description: "Potential compounding growth"
    }
  ];

  return (
    <section aria-labelledby="results-heading">
      <h2 id="results-heading" className="sr-only">Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 md:mt-0">
        {cards.map((card, index) => (
          <motion.article
            key={card.title}
            className="glass-card glass-card-hover p-5 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Background Accent */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${card.bgBase} blur-2xl group-hover:blur-xl transition-all duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-surface-100 border border-white/5 shadow-inner ${card.color}`}>
                  {card.title === "Future Goal Value" ? <Rocket className="w-5 h-5" /> : card.icon}
                </div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {card.title}
                </h3>
              </div>
              <p className={`text-2xl lg:text-3xl font-bold tracking-tight mb-1 text-glow-primary text-white`}>
                <AnimatedNumber value={card.value} />
              </p>
              <p className="text-xs text-slate-400">{card.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

