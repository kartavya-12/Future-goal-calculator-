import Head from "next/head";
import { motion } from "framer-motion";
import CalculatorForm from "../components/CalculatorForm";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Future Goals Investment Calculator</title>
        <meta
          name="description"
          content="Interactive goal-based investment calculator to help you understand how much to invest monthly to work towards your future financial goals."
        />
      </Head>
      <div className="min-h-screen bg-surface-300 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

        <header className="sticky top-0 z-50 border-b border-white/5 bg-surface-200/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 md:py-5 flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg shadow-primary/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  Future Goals Planner
                </span>
                <h1 className="text-sm md:text-xl font-bold text-white tracking-tight">
                  Investment Calculator
                </h1>
              </div>
            </motion.div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 relative z-10">
          <CalculatorForm />
          
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-surface-50"
          >
            <article className="glass-card p-5">
              <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Designed for learning
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                The calculator focuses on transparency and education. It explains how inflation, time, and compounding work together so you can make more informed decisions.
              </p>
            </article>
            <article className="glass-card p-5">
              <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> No product recommendations
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                This experience does not recommend any specific products or guarantee returns. Use it as a starting point for planning and further discussion with a qualified advisor.
              </p>
            </article>
            <article className="glass-card p-5">
              <h2 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Accessible and responsive
              </h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                Built with semantic HTML, keyboard navigation, ARIA labels, and high-contrast styling so it works comfortably across devices for a wide range of users.
              </p>
            </article>
          </motion.section>
        </main>
      </div>
    </>
  );
}

