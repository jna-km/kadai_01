import React, { forwardRef } from "react";
import ReactDatePicker, { DatePickerProps } from "react-datepicker";
import { ja } from "date-fns/locale";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("ja", ja);

type Props = Omit<DatePickerProps, "onChange" | "selected" | "selectsMultiple"> & {
  label?: string;
  error?: string;
  className?: string;
  selected?: Date | null;
  onChange: (date: Date | Date[] | null) => void;
  placeholder?: string;
  selectsMultiple?: never; // 追加
};

const baseClass =
  "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed";

const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = "", placeholder, selected, onChange, ...rest }, ref) => {
    // selectsMultipleを除外
    const { selectsMultiple, ...restProps } = rest;

    return (
      <div>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        )}
        {/* 型エラー回避のため as any を使用 */}
        <ReactDatePicker
          {...(restProps as any)}
          selected={selected}
          onChange={(date: Date | Date[] | null) => {
            const selectedDate = Array.isArray(date) ? date[0] : date;
            onChange(selectedDate);
          }}
          className={`${baseClass} ${className}`}
          placeholderText={placeholder}
          locale="ja"
          dateFormat="yyyy/MM/dd"
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

export default DatePicker;
