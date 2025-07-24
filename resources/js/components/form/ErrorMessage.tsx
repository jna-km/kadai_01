import React from 'react';

interface ErrorMessageProps {
  message?: string | null;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) return null;
  return (
    <p
      className={`text-red-600 text-sm mt-1 ${className ?? ''}`}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
