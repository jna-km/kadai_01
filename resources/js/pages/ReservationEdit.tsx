import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { AuthContext } from "../contexts/AuthContext";
import { User } from '../types/user';
import { FormWrapper, Input, Select, DatePicker } from '@/components/form';

type SelectOption = { label: string; value: string | number };

interface FormValues {
  operator_id: number | '';
  service_id: number | '';
  duration: number | '';
  date: string;
  start_time: string;
  end_time: string; // ← 追加
  notes: string;
}

const ReservationEdit: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth.user as User;

  const [operatorOptions, setOperatorOptions] = useState<SelectOption[]>([]);
  const [serviceOptions, setServiceOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      operator_id: '',
      service_id: '',
      duration: '',
      date: '',
      start_time: '',
      end_time: '', // ← 追加
      notes: '',
    },
  });

  // オペレーター一覧取得
  useEffect(() => {
    axios.get('/api/operators')
      .then(res => {
        const ops = res.data.data || [];
        setOperatorOptions(ops.map((op: any) => ({ label: op.name, value: op.id })));
      })
      .catch(err => {
        setApiError('担当者一覧の取得に失敗しました');
        console.error(err);
      });
  }, []);

  // 予約詳細取得 & 初期値セット
  useEffect(() => {
    if (!reservationId) return;
    setLoading(true);
    axios.get(`/api/reservations/${reservationId}`)
      .then(res => {
        const r = res.data.data || res.data;
        setValue('operator_id', r.operator_id ?? '');
        setValue('service_id', r.service_id ?? '');
        setValue('duration', r.duration ?? '');
        setValue('date', r.date ? r.date.split('T')[0] : '');
        setValue('start_time', r.start_time ? r.start_time.substring(0, 5) : '');
        setValue('notes', r.notes ?? '');
        // サービス一覧も取得
        if (r.operator_id) fetchServices(r.operator_id);
      })
      .catch(err => {
        setApiError('予約情報の取得に失敗しました');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [reservationId, setValue]);

  // operator_id変更時にサービス一覧取得
  const operatorId = control._formValues.operator_id;
  useEffect(() => {
    if (operatorId) fetchServices(operatorId);
  }, [operatorId]);

  const fetchServices = async (operatorId: number | string) => {
    try {
      const res = await axios.get(`/api/public/operators/${operatorId}`);
      const services = res.data.data?.services || [];
      setServiceOptions(services.map((s: any) => ({ label: s.name, value: s.id })));
    } catch (err) {
      setApiError('サービス一覧の取得に失敗しました');
      console.error(err);
    }
  };

  // 追加: 編集時もend_time自動計算
  const start_time = useWatch({ control, name: 'start_time' });
  const duration = useWatch({ control, name: 'duration' });

  useEffect(() => {
    if (!start_time) {
      setValue('end_time', '');
      return;
    }
    const [startHour, startMinute] = start_time.split(':').map(Number);
    let addMinutes = Number(duration);
    if (!addMinutes || isNaN(addMinutes)) addMinutes = 30;
    const totalMinutes = startHour * 60 + startMinute + addMinutes;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;
    const formatted = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    setValue('end_time', formatted);
  }, [start_time, duration, setValue]);

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
      await axios.put(`/api/reservations/${reservationId}`, {
        user_id: user?.id,
        operator_id: data.operator_id,
        service_id: data.service_id,
        duration: data.duration,
        date: data.date,
        start_time: data.start_time,
        end_time: calculatedEndTime,
        notes: data.notes,
      });
      console.log('予約更新成功');
      navigate('/dashboard/reservations');
    } catch (err: any) {
      setApiError(err.response?.data?.message || '予約の更新に失敗しました');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FormWrapper
      title="予約編集"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={loading}
      errorMessage={apiError || undefined}
    >
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
        name="service_id"
        control={control}
        rules={{ required: 'サービスは必須です' }}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            id="service_id"
            name="service_id"
            label="サービス"
            options={serviceOptions}
            placeholder="サービスを選択してください"
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

export default ReservationEdit;
