// resources/js/pages/ReservationCreate.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import DatePicker from '../components/form/DatePicker';

type SelectOption = { label: string; value: string | number };

interface FormValues {
  service_name: string;
  operator_id: number | '';
  duration: number | '';
  date: string;
  start_time: string;
  notes: string;
}

const ReservationCreate: React.FC = () => {
  const [operatorOptions, setOperatorOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      service_name: '',
      operator_id: '',
      duration: '',
      date: '',
      start_time: '',
      notes: '',
    },
  });

  useEffect(() => {
    axios.get('/api/operators')
      .then(res => {
        const ops = res.data.data || [];
        setOperatorOptions(ops.map((op: any) => ({ label: op.name, value: op.id })));
      })
      .catch(err => {
        setApiError('オペレーターの取得に失敗しました');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    if (!user?.id) {
      setApiError('ユーザー情報の読み込みに失敗しました。再ログインしてください。');
      return;
    }
    // 終了時間自動計算
    const startTimeDate = new Date(`${data.date}T${data.start_time}`);
    startTimeDate.setMinutes(startTimeDate.getMinutes() + Number(data.duration));
    const endHours = String(startTimeDate.getHours()).padStart(2, '0');
    const endMinutes = String(startTimeDate.getMinutes()).padStart(2, '0');
    const calculatedEndTime = `${endHours}:${endMinutes}`;
    try {
      const response = await axios.post('/api/reservations', {
        user_id: user?.id,
        operator_id: data.operator_id,
        service_name: data.service_name,
        duration: data.duration,
        date: data.date,
        start_time: data.start_time,
        end_time: calculatedEndTime,
        notes: data.notes,
      });
      if (response.status === 201) {
        alert('予約が完了しました');
        navigate('/dashboard/reservations');
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || '予約に失敗しました');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>新規予約</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="service_name"
          control={control}
          rules={{ required: 'サービス名は必須です' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="service_name"
              name="service_name"
              label="サービス名"
              placeholder="サービス名"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="operator_id"
          control={control}
          rules={{ required: '担当者は必須です' }}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              id="operator_id"
              name="operator_id"
              label="担当者"
              options={operatorOptions}
              placeholder="担当者を選択してください"
              error={fieldState.error?.message}
              ref={field.ref}
            />
          )}
        />
        <Controller
          name="duration"
          control={control}
          rules={{ required: '所要時間は必須です' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="duration"
              name="duration"
              label="所要時間（分）"
              type="number"
              placeholder="所要時間"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: '日付は必須です' }}
          render={({ field, fieldState }) => (
            <DatePicker
              {...field}
              id="date"
              name="date"
              label="日付"
              placeholder="日付を選択"
              error={fieldState.error?.message}
              ref={field.ref}
            />
          )}
        />
        <Controller
          name="start_time"
          control={control}
          rules={{ required: '開始時間は必須です' }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="start_time"
              name="start_time"
              label="開始時間"
              type="time"
              placeholder="開始時間"
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="notes"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="notes"
              name="notes"
              label="備考"
              as="textarea"
              placeholder="任意のメモを入力"
              error={fieldState.error?.message}
            />
          )}
        />
        {apiError && <p className="text-red-500 text-xs mt-1">{apiError}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">予約する</button>
      </form>
    </div>
  );
};

export default ReservationCreate;
