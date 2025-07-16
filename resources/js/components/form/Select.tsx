// 役割：汎用的なセレクトボックスコンポーネント。
// 注意点：React Hook Formのregisterと連携し、options配列を受け取る。

import React from 'react';
import { FieldValues } from 'react-hook-form';
import { SelectProps } from '@/types/form';

const Select: React.FC<SelectProps<FieldValues>> = ({
    label,
    name,
    register,
    options,
    error,
    className = '',
}) => {
    const selectId = name;

    return (
        <div className={`mb-4 ${className}`}>
            <label
                htmlFor={selectId}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <select
                id={selectId}
                {...register(name)}
                className={`mt-1 block w-full rounded-md border py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            >
                <option value="">選択してください</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default Select;
