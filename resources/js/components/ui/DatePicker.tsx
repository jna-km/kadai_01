import 'react-datepicker/dist/react-datepicker.css';
import React, { forwardRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import ErrorMessage from '../form/ErrorMessage';

registerLocale('ja', ja);

type DatePickerProps = {
  id: string;
  name: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  ref?: React.Ref<any>;
};

const DatePicker = forwardRef<any, DatePickerProps>(
  ({ id, name, value, onChange, onBlur, placeholder = '日付を選択', label, error }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <ReactDatePicker
          id={id}
          name={name}
          selected={value}
          onChange={onChange}
          onBlur={onBlur}
          locale="ja"
          dateFormat="yyyy/MM/dd"
          placeholderText={placeholder}
          className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm${error ? ' border-red-500' : ' border-gray-300'}`}
          wrapperClassName="w-full"
          calendarClassName="react-datepicker"
          ref={ref}
        />
        {error && <ErrorMessage message={error} />}
      </div>
    );
  }
);

export default DatePicker;
