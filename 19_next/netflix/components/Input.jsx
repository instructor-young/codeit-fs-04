"use client";

import { useId } from "react";

function Input({
  label,
  name,
  value,
  onChange,
  type,
  placeholder,
  required,
  helperText,
}) {
  const inputId = useId();

  return (
    <div className="inline-flex flex-col w-80 gap-y-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold">
        {label}
        {required && <sup className="text-red-500">*</sup>}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-400 transition-all px-4 py-2 text-black rounded-md outline-none focus:ring-4 ring-white/75 ring-offset-2 ring-offset-gray-500"
      />
      {helperText && (
        <span className="text-sm text-white/80">{helperText}</span>
      )}
    </div>
  );
}

export default Input;
