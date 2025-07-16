// 役割：日付選択コンポーネント。
// 注意点：React Hook FormのControllerと連携して使用する。
// 依存パッケージ: react-datepicker, @types/react-datepicker

import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { DatePickerProps } from '@/types/form';

// react-datepickerの日本語化
registerLocale('ja', ja);

const DatePicker: React.FC<DatePickerProps<FieldValues>> = ({
    control,
    name,
    label,
    error,
    placeholderText = '日付を選択',
    className = '',
}) => {
    const datePickerId = name;

    return (
        <div className={`mb-4 ${className}`}>
            <label
                htmlFor={datePickerId}
                className="mb-1 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <ReactDatePicker
                        id={datePickerId}
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        locale="ja"
                        dateFormat="yyyy/MM/dd"
                        placeholderText={placeholderText}
                        className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                            error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        wrapperClassName="w-full"
                        calendarClassName="react-datepicker"
                    />
                )}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    );
};

export default DatePicker;
