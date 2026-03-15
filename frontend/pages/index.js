import Head from "next/head";
import { motion } from "framer-motion";
import CalculatorForm from "../components/CalculatorForm";

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
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                Future Goals Planner
              </span>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Future Goals Investment Calculator
              </h1>
              <p className="mt-1 text-xs md:text-sm text-neutral max-w-2xl">
                An educational tool to estimate how much you may need to invest
                every month to work towards specific future financial goals.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <motion.section
            aria-label="Future goals investment planning"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8"
          >
            <CalculatorForm />
          </motion.section>

          <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-800">
            <article className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-semibold text-primary mb-1">
                Designed for learning
              </h2>
              <p>
                The calculator focuses on transparency and education. It
                explains how inflation, time, and compounding work together so
                you can make more informed decisions.
              </p>
            </article>
            <article className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-semibold text-primary mb-1">
                No product recommendations
              </h2>
              <p>
                This experience does not recommend any specific products or
                guarantee returns. Use it as a starting point for planning and
                further discussion with a qualified advisor.
              </p>
            </article>
            <article className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-semibold text-primary mb-1">
                Accessible and responsive
              </h2>
              <p>
                Built with semantic HTML, keyboard navigation, ARIA labels, and
                high-contrast colors so it works comfortably across devices and
                for a wide range of users.
              </p>
            </article>
          </section>
        </main>
      </div>
    </>
  );
}

