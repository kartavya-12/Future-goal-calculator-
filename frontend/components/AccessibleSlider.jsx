import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AccessibleSlider({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  helperText,
  suffix = "",
  ariaDescribedBy
}) {
  const describedById = ariaDescribedBy || (helperText ? `${id}-helper` : undefined);
  const [isFocused, setIsFocused] = useState(false);

  // Calculate percentage for background gradient
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-gray-200"
        >
          {label}
        </label>
        <motion.div 
          animate={{ scale: isFocused ? 1.05 : 1, color: isFocused ? "#38bdf8" : "#94a3b8" }}
          className="text-lg font-bold text-sky-400"
        >
          {value}{suffix}
        </motion.div>
      </div>
      <div className="relative flex items-center h-8">
        {/* Custom slider track appearance */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-describedby={describedById}
          className="absolute w-full h-2 appearance-none bg-surface-100 rounded-full outline-none focus:ring-2 focus:ring-primary z-10 cursor-pointer"
          style={{
            background: `linear-gradient(to right, #224c87 0%, #38bdf8 ${percentage}%, #1e293b ${percentage}%, #1e293b 100%)`
          }}
        />
        {/* Subtle glow behind the thumb */}
        {isFocused && (
          <motion.div 
            layoutId="sliderGlow"
            className="absolute h-4 rounded-full bg-sky-400/30 blur-md pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, width: `${percentage}%` }}
            transition={{ duration: 0.1 }}
          />
        )}
      </div>
      {helperText && (
        <p
          id={describedById}
          className="mt-2 text-xs text-slate-400"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

