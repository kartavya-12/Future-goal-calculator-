import React from "react";

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

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 mb-1"
      >
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-describedby={describedById}
          className="w-full accent-primary"
        />
        <div className="min-w-[4rem] text-sm text-gray-900">
          {value}
          {suffix}
        </div>
      </div>
      {helperText && (
        <p
          id={describedById}
          className="mt-1 text-xs text-gray-700"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

