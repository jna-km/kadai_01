import React from 'react';
import Button from '../ui/Button';

interface FormWrapperProps {
  title?: string;
  description?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  description,
  onSubmit,
  isLoading = false,
  errorMessage,
  successMessage,
  children,
}) => (
  <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
    {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    {errorMessage && (
      <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
        {errorMessage}
      </div>
    )}
    {successMessage && (
      <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
        {successMessage}
      </div>
    )}
    <form onSubmit={onSubmit} className="space-y-4">
      {children}
      <div className="text-right">
        <Button type="submit" variant="primary" isLoading={isLoading}>
          送信
        </Button>
      </div>
    </form>
  </div>
);

export default FormWrapper;
