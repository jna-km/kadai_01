import React, { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

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

    const inputProps = {
      id,
      name,
      className: `${baseClass} ${className}`,
      ...rest,
    };

    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="text-sm font-bold block mb-2">
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
