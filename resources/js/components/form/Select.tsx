
import React, { forwardRef } from 'react';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, name, value, onChange, onBlur, options, placeholder, label, error }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="text-sm font-bold block mb-2">
            {label}
          </label>
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          className={`border rounded-md p-2 w-full${error ? ' border-red-500' : ''}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default Select;
