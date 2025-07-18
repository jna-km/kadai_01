import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface InputProps {
  label: string;
  type?: string;
  error?: any;
  placeholder?: string;
  field: ControllerRenderProps<any, any>; // ← Controllerから渡すfield
}

const Input: React.FC<InputProps> = ({ label, type = 'text', placeholder, error, field }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold">{label}</label>
      <input
        type={type}
        {...field} // ← fieldにvalueとonChangeが入っている
        placeholder={placeholder}
        className="border p-2 w-full"
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

export default Input;
