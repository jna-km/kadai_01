import React, { forwardRef } from 'react';
import ErrorMessage from '../form/ErrorMessage';

type InputProps = {
  id: string;
  name: string;
  label?: string;
  error?: string;
  as?: 'input' | 'textarea';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    { id, name, label, error, as = 'input', className = '', size = 'md', ...rest },
    ref
  ) => {
    const sizeClass =
      size === 'sm'
        ? 'p-2 text-sm'
        : size === 'lg'
        ? 'p-4 text-lg'
        : 'p-3 text-base';

    const baseClass = `w-full rounded-lg border ${
      error ? 'border-red-500' : 'border-gray-300'
    } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-200 ease-in-out text-gray-700 placeholder-gray-400`;

    const inputProps = {
      id,
      name,
      className: `${baseClass} ${sizeClass} ${className}`,
      ...rest,
    };

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold block mb-2">
            {label}
          </label>
        )}
        {as === 'textarea' ? (
          <textarea
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            ref={ref as React.Ref<HTMLTextAreaElement>}
          />
        ) : (
          <input
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
        <ErrorMessage message={error} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
