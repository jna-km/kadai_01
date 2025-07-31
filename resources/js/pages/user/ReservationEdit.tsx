import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useAuthStore } from '../../stores/authStore';
import { User } from '../../types/user';
import { FormWrapper } from '@/components/form';
import { Input, Select, DatePicker } from '@/components/ui';
import { toast } from 'sonner';
import { ApiResponse } from '../../types/api';

type SelectOption = { label: string; value: string };

interface FormValues {
  operator_id: string;
  service_id: string;
  duration: number | '';
  date: string;
  start_time: string;
  end_time: string;
  notes: string;
}

const ReservationEdit: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const user = useAuthStore.getState().user as User;

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
      end_time: '',
      notes: '',
    },
  });

  // オペレーター一覧取得
  useEffect(() => {
    axios.get<ApiResponse<any[]>>('/api/operators')
      .then(res => {
        const ops = res.data.data || [];
        setOperatorOptions(ops.map((op: any) => ({ label: op.name, value: String(op.id) })));
      })
      .catch(err => {
        setApiError('担当者一覧の取得に失敗しました');
        console.error(err);
      })
      .then(() => setLoading(false)); // finallyの代わりにthenでsetLoading
  }, []);

  // 予約詳細取得 & 初期値セット
  useEffect(() => {
    if (!reservationId) return;
    setLoading(true);
    axios.get<ApiResponse<any>>(`/api/reservations/${reservationId}`)
      .then(res => {
        const r = res.data.data || res.data;
        setValue('operator_id', r.operator_id ? String(r.operator_id) : '');
        setValue('service_id', r.service_id ? String(r.service_id) : '');
        setValue('duration', r.duration ?? '');
        setValue('date', r.date ? r.date.split('T')[0] : '');
        setValue('start_time', r.start_time ? r.start_time.substring(0, 5) : '');
        setValue('notes', r.notes ?? '');
        if (r.operator_id) fetchServices(r.operator_id);
      })
      .catch(err => {
        setApiError('予約情報の取得に失敗しました');
        console.error(err);
      })
      .then(() => setLoading(false)); // finallyの代わりにthenでsetLoading
  }, [reservationId, setValue]);

  // operator_id変更時にサービス一覧取得
  const operatorId = control._formValues.operator_id;
  useEffect(() => {
    if (operatorId) fetchServices(operatorId);
  }, [operatorId]);

  const fetchServices = async (operatorId: string) => {
    try {
      const res = await axios.get<ApiResponse<any>>(`/api/public/operators/${operatorId}`);
      const services = res.data.data?.services || [];
      const serviceOptions = services.map((service: any) => ({
        label: service.name,
        value: String(service.id),
      }));
      setServiceOptions(serviceOptions);
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
      toast.success("予約更新成功");
      navigate('/user/reservations');
    } catch (err: any) {
      setApiError(err.response?.data?.message || '予約の更新に失敗しました');
      console.error(err);
      toast.error("予約更新失敗");
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
            id="operator_id"
            name="operator_id"
            label="担当者"
            options={operatorOptions}
            placeholder="担当者を選択してください"
            error={fieldState.error?.message}
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
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
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name="duration"
        control={control}
        rules={{ required: '所要時間は必須です' }}
        render={({ field, fieldState }) => (
          <Input
            id="duration"
            name="duration"
            label="所要時間（分）"
            type="number"
            placeholder="所要時間"
            error={fieldState.error?.message}
            value={field.value || ''}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        rules={{ required: '日付は必須です' }}
        render={({ field, fieldState }) => (
          <DatePicker
            id="date"
            name="date"
            label="日付"
            placeholder="日付を選択"
            error={fieldState.error?.message}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => {
              let iso = '';
              if (Array.isArray(date)) {
                if (date[0] instanceof Date) iso = date[0].toISOString().split('T')[0];
              } else if (date instanceof Date) {
                iso = date.toISOString().split('T')[0];
              }
              field.onChange(date ? iso : '');
            }}
          />
        )}
      />
      <Controller
        name="start_time"
        control={control}
        rules={{ required: '開始時間は必須です' }}
        render={({ field, fieldState }) => (
          <Input
            id="start_time"
            name="start_time"
            label="開始時間"
            type="time"
            placeholder="開始時間"
            error={fieldState.error?.message}
            value={field.value || ''}
            onChange={field.onChange}
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
            id="notes"
            name="notes"
            label="備考"
            placeholder="任意のメモを入力"
            error={fieldState.error?.message}
            value={field.value || ''}
            onChange={field.onChange}
            className="h-24"
          />
        )}
      />
    </FormWrapper>
  );
};

export default ReservationEdit;
