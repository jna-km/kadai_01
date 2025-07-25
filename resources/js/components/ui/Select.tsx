import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  className?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

const baseClass =
  "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed";

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  className = "",
  options,
  placeholder,
  ...props
}) => (
  <div>
    {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <select
      className={`${baseClass} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="mt-1 text-xs text-red-600">{error}</p>
    )}
  </div>
);

export default Select;
