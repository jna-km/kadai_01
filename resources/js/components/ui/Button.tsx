import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-semibold rounded transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    outline: 'border border-gray-400 text-gray-700 hover:bg-gray-100',
    ghost: 'bg-transparent text-blue-500 hover:bg-blue-50',
  };

  return (
    <button
      type={props.type || "button"}
      aria-label={props["aria-label"] || (isLoading ? "処理中" : undefined)}
      className={clsx(baseStyle, sizeStyles[size], variantStyles[variant], className)}
      aria-busy={isLoading}
      aria-disabled={isLoading || props.disabled}
      aria-live="polite"
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2" />
      )}
      {isLoading ? '処理中...' : children}
    </button>
  );
};

export default Button;
