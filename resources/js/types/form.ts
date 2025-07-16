// 役割：フォームコンポーネントで共通して使用するPropsの型定義。
// 注意点：React Hook Formとの連携を前提としており、汎用性を高めている。

import {
    Control,
    FieldError,
    FieldValues,
    Path,
    UseFormRegister,
} from 'react-hook-form';

/**
 * 多くのフォーム要素で共通する基本のProps
 * @template T - フォームの型定義 (例: ReservationFormInputs)
 */
interface BaseProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    error?: FieldError;
    className?: string;
}

/**
 * Inputコンポーネント用のProps
 * @template T - フォームの型定義
 */
export interface InputProps<T extends FieldValues> extends BaseProps<T> {
    register: UseFormRegister<T>;
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
}

/**
 * Selectコンポーネントの選択肢の型
 */
export interface SelectOption {
    value: string | number;
    label: string;
}

/**
 * Selectコンポーネント用のProps
 * @template T - フォームの型定義
 */
export interface SelectProps<T extends FieldValues> extends BaseProps<T> {
    register: UseFormRegister<T>;
    options: SelectOption[];
}

/**
 * DatePickerコンポーネント用のProps
 * React Hook FormのControllerコンポーネントと組み合わせて使うことを想定
 * @template T - フォームの型定義
 */
export interface DatePickerProps<T extends FieldValues> extends BaseProps<T> {
    control: Control<T>;
    placeholderText?: string;
}
