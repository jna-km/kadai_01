import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from '../components/form/DatePicker';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import axios from 'axios';

type SelectOption = {
  label: string;
  value: string | number;
};

interface ReservationFormInputs {
  name: string;
  email: string;
  service_id: number | '';
  operator_id: number | '';
  date: Date | null;
  duration: number;
  start_time: string;
  end_time: string;
  notes: string;
}

const CreateReservation: React.FC = () => {
  const [operatorOptions, setOperatorOptions] = useState<SelectOption[]>([]);
  const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ReservationFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      service_id: '',
      operator_id: '',
      date: new Date(),
      duration: 30,
      start_time: '',
      end_time: '',
      notes: ''
    }
  });

  // オペレーター一覧取得
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const res = await axios.get('/api/operators');
        const operators = res.data.data || [];
        setOperatorOptions(operators.map((op: any) => ({
          value: op.id,
          label: op.name
        })));
      } catch (err) {
        console.error('Failed to load operators', err);
      }
    };
    fetchOperators();
  }, []);

  // operator_idが変わったらサービス一覧取得
  const operatorId = watch('operator_id');
  useEffect(() => {
    const fetchServices = async () => {
      if (operatorId) {
        try {
          const res = await axios.get(`/api/public/operators/${operatorId}`);
          const services = res.data?.data?.services || [];
          setServiceOptions(services.map((s: any) => ({
            value: s.id,
            label: s.name
          })));
          setServiceError(null);
          setValue('service_id', '');
          setValue('start_time', '');
          setValue('end_time', '');
        } catch (err: any) {
          console.error('Failed to load services', err);
          setServiceOptions([]);
          setServiceError('サービス情報を取得できませんでした');
          setValue('service_id', '');
          setValue('start_time', '');
          setValue('end_time', '');
        }
      } else {
        setServiceOptions([]);
        setServiceError(null);
        setValue('service_id', '');
        setValue('start_time', '');
        setValue('end_time', '');
      }
    };
    fetchServices();
  }, [operatorId, setValue]);

  // フォーム送信
  const onSubmit = async (data: ReservationFormInputs) => {
    try {
      const userResponse = await axios.get('/api/user');
      const userId = userResponse.data?.id;
      if (!userId) {
        alert('ユーザー情報の取得に失敗しました。再ログインしてください。');
        window.location.href = '/login';
        return;
      }
      const payload = { ...data, user_id: userId };
      await axios.post('/api/reservations', payload);
      console.log('予約成功');
      reset();
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      alert('予約作成に失敗しました');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-6 text-2xl font-bold">新規予約作成</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        {/* 名前 */}
        <Input
          id="name"
          label="名前"
          placeholder="氏名を入力"
          error={errors.name?.message}
          {...register('name', { required: '名前は必須です' })}
        />

        {/* メール */}
        <Input
          id="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力"
          error={errors.email?.message}
          {...register('email', { required: 'メールは必須です' })}
        />

        {/* 担当者 */}
        <Controller
          name="operator_id"
          control={control}
          rules={{ required: '担当者を選択してください' }}
          render={({ field }) => (
            <Select
              id="operator_id"
              name="operator_id"
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={operatorOptions}
              placeholder="担当者を選択してください"
              label="担当者"
              error={errors.operator_id?.message}
              ref={field.ref}
            />
          )}
        />

        {/* サービス */}
        <Controller
          name="service_id"
          control={control}
          rules={{ required: 'サービスを選択してください' }}
          render={({ field }) => (
            <>
              <Select
                id="service_id"
                name="service_id"
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={serviceOptions}
                placeholder="サービスを選択してください"
                label="サービス"
                error={errors.service_id?.message}
                ref={field.ref}
              />
              {serviceError && (
                <p className="mt-1 text-sm text-red-600">{serviceError}</p>
              )}
            </>
          )}
        />


        {/* 日付 */}
        <Controller
          name="date"
          control={control}
          rules={{ required: '予約日は必須です' }}
          render={({ field, fieldState }) => (
            <DatePicker
              id="date"
              name="date"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="予約日"
              placeholder="日付を選択"
              error={fieldState.error?.message}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <Input
              id="duration"
              name="duration"
              label="所要時間(分)"
              type="number"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.duration?.message}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="start_time"
          control={control}
          render={({ field }) => (
            <Input
              id="start_time"
              name="start_time"
              label="開始時間"
              type="time"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.start_time?.message}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="end_time"
          control={control}
          render={({ field }) => (
            <Input
              id="end_time"
              name="end_time"
              label="終了時間"
              type="time"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.end_time?.message}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Input
              id="notes"
              name="notes"
              label="備考"
              as="textarea"
              placeholder="任意のメモを入力"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.notes?.message}
              ref={field.ref}
            />
          )}
        />

        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            予約を作成する
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReservation;
