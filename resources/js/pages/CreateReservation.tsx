import React, { useState, useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import DatePicker from '../components/form/DatePicker';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { SelectOption } from '../types/form';
import axios from 'axios';

interface ReservationFormInputs {
  service_id: number;
  operator_id: number;
  date: Date | null;
  duration: number;
  start_time: string;
  end_time: string;
  notes: string;
}

const CreateReservation: React.FC = () => {
  const [operatorOptions, setOperatorOptions] = useState<SelectOption[]>([]);
  const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);
  const { control, handleSubmit, watch, formState: { errors }, resetField: fieldReset } = useForm<ReservationFormInputs>({
    defaultValues: {
      service_id: undefined,
      operator_id: undefined,
      date: new Date(),
      duration: 30,
      start_time: '',
      end_time: '',
      notes: ''
    }
  });

  // 1. オペレーター一覧取得
  useEffect(() => {
    axios.get('/api/operators')
      .then(res => {
        const operators = res.data.data || [];
        setOperatorOptions(operators.map((op: any) => ({
          value: op.id,
          label: op.name
        })));
      })
      .catch(err => console.error('Failed to load operators', err));
  }, []);

  // 2. operator_idが変わったらサービス一覧取得
  const operatorId = watch('operator_id');
  useEffect(() => {
    if (operatorId) {
      axios.get(`/api/public/operators/${operatorId}`)
        .then(res => {
          const services = res.data?.data?.services || [];
          setServiceOptions(services.map((s: any) => ({
            value: s.id,
            label: s.name
          })));
          // Reset service_id and dependent fields when operator changes
          fieldReset('service_id', undefined);
          fieldReset('start_time', '');
          fieldReset('end_time', '');
        })
        .catch(err => console.error('Failed to load services', err));
    } else {
      setServiceOptions([]);
      fieldReset('service_id', undefined);
      fieldReset('start_time', '');
      fieldReset('end_time', '');
    }
  }, [operatorId]);

  // 3. フォーム送信
  const onSubmit: SubmitHandler<ReservationFormInputs> = async (data) => {
    try {
      // ユーザー情報を取得
      const userResponse = await axios.get('/api/user');
      const userId = userResponse.data?.id;

      if (!userId) {
        alert('ユーザー情報の取得に失敗しました。再ログインしてください。');
        window.location.href = '/login';
        return;
      }

      const payload = { ...data, user_id: userId };

      const response = await axios.post('/api/reservations', payload);
      console.log('API Response:', response.data);
      alert('予約が作成されました');
      window.location.href = '/dashboard/reservations';
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
        {/* 担当者 */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">担当者</label>
          <Controller
            name="operator_id"
            control={control}
            rules={{ required: '担当者を選択してください' }}
            render={({ field }) => (
              <Select
                value={field.value || ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                options={operatorOptions}
              />
            )}
          />
          {errors.operator_id && <p className="text-red-500 text-xs">{errors.operator_id.message}</p>}
        </div>

        {/* サービス */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">サービス</label>
          <Controller
            name="service_id"
            control={control}
            rules={{ required: 'サービスを選択してください' }}
            render={({ field }) => (
              <Select
                value={field.value || ''}
                onChange={(e) => field.onChange(Number(e.target.value))}
                options={serviceOptions}
              />
            )}
          />
          {errors.service_id && <p className="text-red-500 text-xs">{errors.service_id.message}</p>}
        </div>

        {/* 日付 */}
        <DatePicker
          label="予約日"
          name="date"
          control={control}
          error={errors.date}
        />

        <Controller
          name="duration"
          control={control}
          render={({ field }) => (
            <Input label="所要時間(分)" type="number" field={field} error={errors.duration} />
          )}
        />

        <Controller
          name="start_time"
          control={control}
          render={({ field }) => (
            <Input label="開始時間" type="time" field={field} error={errors.start_time} />
          )}
        />

        <Controller
          name="end_time"
          control={control}
          render={({ field }) => (
            <Input label="終了時間" type="time" field={field} error={errors.end_time} />
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <Input label="備考" placeholder="任意のメモを入力" field={field} error={errors.notes} />
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
