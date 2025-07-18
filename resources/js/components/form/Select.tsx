import React from 'react';

interface SelectProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <select
      value={value || ''}
      onChange={onChange}
      className="w-full rounded border px-3 py-2"
    >
      <option value="">選択してください</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
