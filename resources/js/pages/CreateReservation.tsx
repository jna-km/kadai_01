// 役割：新規予約作成ページ。共通フォームコンポーネントを統合する。
// 注意点：React Hook Formを使用してフォームの状態管理とバリデーションを行う。

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from '../components/form/DatePicker';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { SelectOption } from '../types/form';
import axios from 'axios';

// フォームの入力値の型（仮）
// TODO: バリデーションスキーマ等で正式に定義する
interface ReservationFormInputs {
    service_name: string;
    operator_id: number;
    date: Date | null;
}

const CreateReservation: React.FC = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ReservationFormInputs>({
        defaultValues: {
            service_name: '',
            operator_id: undefined,
            date: new Date(),
        },
    });

    // TODO: 担当者一覧をAPIから取得する
    const operatorOptions = [
        { value: 1, label: '山田 太郎' },
        { value: 2, label: '鈴木 花子' },
    ];

    const onSubmit: SubmitHandler<ReservationFormInputs> = (data) => {
        console.log('Form Data:', data);
        alert(
            '予約データがコンソールに出力されました。次はAPI連携とバリデーションを実装しましょう。'
        );
        // TODO: axios等でAPIにデータを送信する
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="mb-6 text-2xl font-bold">新規予約作成</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md"
            >
                <Input
                    label="サービス名"
                    name="service_name"
                    register={register}
                    error={errors.service_name}
                    placeholder="例：カット＆シャンプー"
                />

                <Select
                    label="担当者"
                    name="operator_id"
                    register={register}
                    options={operatorOptions}
                    error={errors.operator_id}
                />

                <DatePicker
                    label="予約日"
                    name="date"
                    control={control}
                    error={errors.date}
                />

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        予約を作成する
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateReservation;
