import React, { forwardRef } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ja", ja);

type Props = Omit<ReactDatePickerProps, "onChange" | "selected"> & {
  label?: string;
  error?: string;
  className?: string;
  selected?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
};

const baseClass =
  "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed";

const DatePicker = forwardRef<ReactDatePicker, Props>(
  ({ label, error, className = "", placeholder, selected, onChange, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        )}
        <ReactDatePicker
          selected={selected ?? null}
          onChange={(date) => onChange(date ?? null)}
          className={`${baseClass} ${className}`}
          placeholderText={placeholder}
          locale="ja"
          dateFormat="yyyy/MM/dd"
          ref={ref}
          {...rest}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

export default DatePicker;
