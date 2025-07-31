import React, { forwardRef } from "react";
import clsx from "clsx";
import ErrorMessage from "../form/ErrorMessage";

type InputProps = {
  id: string;
  name: string;
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  as?: "input" | "textarea";
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export type ErrorMessageProps = {
  message?: string;
  id?: string;
};

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      id,
      name,
      label,
      error,
      helperText,
      success,
      as = "input",
      className,
      size = "md",
      required,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const sizeClass = {
      sm: "p-2 text-sm",
      md: "p-3 text-base",
      lg: "p-4 text-lg",
    }[size];

    const baseClass =
      "w-full rounded-lg border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-200 ease-in-out text-gray-700 placeholder-gray-400";

    const borderColorClass = error
      ? "border-red-500"
      : success
      ? "border-green-500"
      : "border-gray-300";

    const inputClass = clsx(baseClass, sizeClass, borderColorClass, className);

    const helperTextId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    const describedBy = [helperTextId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold block mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {as === "textarea" ? (
          <textarea
            id={id}
            name={name}
            className={clsx(inputClass, "resize-none")}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            aria-required={required ? "true" : undefined}
            disabled={disabled}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rest.rows ?? 3}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            name={name}
            className={inputClass}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            aria-required={required ? "true" : undefined}
            disabled={disabled}
            ref={ref as React.Ref<HTMLInputElement>}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {helperText && (
          <p id={helperTextId} className="text-xs text-gray-500 mt-1">
            {helperText}
          </p>
        )}
        <ErrorMessage id={errorId} message={error} />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
