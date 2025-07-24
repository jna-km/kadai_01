import React, { forwardRef } from 'react';

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  id: string;
  name: string;
  value: string | number | null | undefined;
  onChange: (value: string | number) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, name, value, onChange, onBlur, options, placeholder, label, error }, ref) => {
    const normalizedValue =
      value === null || value === undefined || Number.isNaN(value) ? '' : String(value);

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
          ref={ref}
          value={normalizedValue}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full border rounded-md p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">{placeholder || '選択してください'}</option>
          {options.map(opt => (
            <option key={opt.value} value={String(opt.value)}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default Select;
