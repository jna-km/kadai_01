import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { FormWrapper } from '@/components/form';
import { Input, Select, DatePicker } from '@/components/ui';

type OperatorOption = { label: string; value: number };
type ServiceOption = { label: string; value: number; duration: number };

interface FormValues {
  operator_id: number | '';
  service_id: number | '';
  duration: number | '';
  date: string;
  start_time: string;
  end_time: string;
  notes: string;
}

const ReservationCreate: React.FC = () => {
  const [operatorOptions, setOperatorOptions] = useState<OperatorOption[]>([]);
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      operator_id: '',
      service_id: '',
      duration: '',
      date: '',
      start_time: '',
      end_time: '',
      notes: '',
    },
  });

  const date = useWatch({ control, name: 'date' });
  const start_time = useWatch({ control, name: 'start_time' });
  const duration = useWatch({ control, name: 'duration' });

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

  // operator変更でサービス一覧を取得
  const fetchServices = async (operatorId: number) => {
    if (!operatorId || typeof operatorId !== 'number' || isNaN(operatorId)) return;
    try {
      const res = await axios.get(`/api/public/operators/${operatorId}`);
      console.log('API response for services:', res.data);
      const services = res.data.data?.services || [];
      setServiceOptions(services.map((s: any) => ({
        label: s.name,
        value: s.id,
        duration: s.duration
      })));
      console.log('Fetched services:', services);
    } catch (err) {
      setApiError('サービス一覧の取得に失敗しました');
      console.error(err);
    }
  };

  // service選択時にdurationをローカルからセット
  const handleServiceChange = (serviceId: number) => {
    const service = serviceOptions.find(opt => opt.value === serviceId);
    if (service) {
      setValue('duration', service.duration);
    }
  };

  // end_timeの自動計算
  useEffect(() => {
    if (!start_time) {
      setValue('end_time', '');
      return;
    }

    // start_timeを分単位に変換
    const [startHour, startMinute] = start_time.split(':').map(Number);
    let addMinutes = Number(duration);
    if (!addMinutes || isNaN(addMinutes)) addMinutes = 30;

    // 合計分を計算
    const totalMinutes = startHour * 60 + startMinute + addMinutes;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;

    // HH:mm形式でセット
    const formatted = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    setValue('end_time', formatted);
  }, [start_time, duration, setValue]);

  const onSubmit = async (data: FormValues) => {
    setApiError(null);
    if (!user?.id) {
      setApiError('ユーザー情報の読み込みに失敗しました。再ログインしてください。');
      return;
    }
    try {
      const response = await axios.post('/api/reservations', {
        user_id: user?.id,
        operator_id: data.operator_id,
        service_id: data.service_id,
        duration: data.duration,
        date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
        notes: data.notes,
      });
      if (response.status === 201) {
        navigate('/dashboard/reservations');
      }
    } catch (err: any) {
      setApiError(err.response?.data?.message || '予約に失敗しました');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <FormWrapper
      title="予約作成"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={loading}
      errorMessage={apiError || undefined}
    >
      {/* 担当者 */}
      <Controller
        name="operator_id"
        control={control}
        rules={{ required: '担当者は必須です' }}
        render={({ field, fieldState }) => (
          <Select
            id="operator_id"
            name="operator_id"
            label="担当者"
            options={operatorOptions}
            placeholder="担当者を選択してください"
            error={fieldState.error?.message}
            ref={field.ref}
            value={field.value ?? ''}
            onChange={val => {
              const selectedId = val === '' ? '' : Number(val);
              field.onChange(selectedId);
              if (selectedId !== '') {
                fetchServices(selectedId);
                setValue('service_id', '');
              } else {
                setServiceOptions([]);
                setValue('service_id', '');
              }
            }}
          />
        )}
      />

      {/* サービス */}
      <Controller
        name="service_id"
        control={control}
        rules={{ required: 'サービスは必須です' }}
        render={({ field, fieldState }) => (
          <Select
            id="service_id"
            name="service_id"
            label="サービス"
            options={serviceOptions}
            placeholder="サービスを選択してください"
            error={fieldState.error?.message}
            ref={field.ref}
            value={field.value ?? ''}
            onChange={val => {
              const selectedId = val === '' ? '' : Number(val);
              field.onChange(selectedId);
              if (selectedId !== '') {
                handleServiceChange(selectedId);
              }
            }}
          />
        )}
      />

      {/* 所要時間 */}
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

      {/* 日付 */}
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

      {/* 開始時間 */}
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

      {/* 終了時間（表示のみ） */}
      <Controller
        name="end_time"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="end_time"
            name="end_time"
            label="終了時間"
            type="time"
            readOnly
            value={
              field.value &&
              /^([01]\d|2[0-3]):([0-5]\d)$/.test(field.value)
                ? field.value
                : ''
            }
          />
        )}
      />

      {/* 備考 */}
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
    </FormWrapper>
  );
};

export default ReservationCreate;
