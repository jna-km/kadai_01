// 役割：汎用的なテキスト入力コンポーネント。
// 注意点：React Hook Formのregisterと連携して使用する。

import React from 'react';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '@/types/form';

const Input: React.FC<InputProps<FieldValues>> = ({
    label,
    name,
    register,
    error,
    type = 'text',
    placeholder,
    className = '',
}) => {
    const inputId = name;

    return (
        <div className={`mb-4 ${className}`}>
            <label
                htmlFor={inputId}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={inputId}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default Input;
