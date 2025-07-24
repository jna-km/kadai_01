
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from "../contexts/AuthContext";
import { User } from '../types/user';
import Select from '../components/form/Select';
import Input from '../components/form/Input';
import DatePicker from '../components/form/DatePicker';

type SelectOption = { label: string; value: string | number };

interface FormValues {
  operator_id: number | '';
  service_id: number | '';
  duration: number | '';
  date: string;
  start_time: string;
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
    <div>
      <h2>予約編集</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="operator_id"
          control={control}
          rules={{ required: '担当者は必須です' }}
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
        <Controller
          name="service_id"
          control={control}
          rules={{ required: 'サービスは必須です' }}
          render={({ field }) => (
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
          )}
        />
        <Input
          id="duration"
          name="duration"
          label="所要時間（分）"
          type="number"
          placeholder="所要時間"
          error={errors.duration?.message}
          {...register('duration', { required: '所要時間は必須です' })}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: '日付は必須です' }}
          render={({ field, fieldState }) => (
            <DatePicker
              id="date"
              name="date"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="日付"
              placeholder="日付を選択"
              error={fieldState.error?.message}
              ref={field.ref}
            />
          )}
        />
        <Input
          id="start_time"
          name="start_time"
          label="開始時間"
          type="time"
          placeholder="開始時間"
          error={errors.start_time?.message}
          {...register('start_time', { required: '開始時間は必須です' })}
        />
        <Input
          id="notes"
          name="notes"
          as="textarea"
          label="備考"
          placeholder="任意のメモを入力"
          error={errors.notes?.message}
          {...register('notes')}
        />
        {apiError && <p className="text-red-500 text-xs mt-1">{apiError}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">更新する</button>
      </form>
    </div>
  );
};

export default ReservationEdit;
