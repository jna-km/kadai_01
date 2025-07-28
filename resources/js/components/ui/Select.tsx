import React from "react";
import clsx from "clsx";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  className?: string;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
};

const baseClass =
  "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed";

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  success,
  className,
  options,
  placeholder,
  id,
  value,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        className={clsx(
          baseClass,
          className,
          error && "border-red-500",
          success && !error && "border-green-500",
          !value && placeholder && "text-gray-400"
        )}
        aria-invalid={!!error}
        aria-describedby={describedBy}
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
      {helperText && <p id={helperId} className="mt-1 text-xs text-gray-500">{helperText}</p>}
      {error && <p id={errorId} className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
