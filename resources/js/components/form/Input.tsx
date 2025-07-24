

import React, { forwardRef } from 'react';

type InputProps = {
  id: string;
  name: string;
  label?: string;
  error?: string;
  as?: 'input' | 'textarea';
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ id, name, label, error, as = 'input', className = '', ...rest }, ref) => {
    const baseClass =
      'w-full border rounded-md p-2 ' +
      (error ? 'border-red-500' : 'border-gray-300');

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="text-sm font-bold block mb-2">
            {label}
          </label>
        )}
        {as === 'textarea' ? (
          <textarea
            id={id}
            name={name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseClass} ${className}`}
            {...rest}
          />
        ) : (
          <input
            id={id}
            name={name}
            ref={ref as React.Ref<HTMLInputElement>}
            className={`${baseClass} ${className}`}
            {...rest}
          />
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
