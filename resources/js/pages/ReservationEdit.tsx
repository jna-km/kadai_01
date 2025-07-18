import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import { AuthContext } from "../contexts/AuthContext";
import { User } from '../types/user';

interface Operator {
  id: number;
  name: string;
}

const ReservationEdit: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  // const { user } = useAuth();
  const auth = useContext(AuthContext);
  const user = auth.user as User;

  const [operators, setOperators] = useState<Operator[]>([]);
  const [operator_id, setOperatorId] = useState<number | null>(null);
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [start_time, setStartTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async (operatorId: number) => {
    try {
      const res = await axios.get(`/api/public/operators/${operatorId}`);
      setServices(res.data.data.services || []);
    } catch (err) {
      console.error('サービス取得に失敗:', err);
    }
  };

  useEffect(() => {
    const fetchReservationData = async () => {
      if (!reservationId) {
        setError('予約IDが指定されていません。');
        setLoading(false);
        return;
      }
      try {
        // 既存の予約データと担当者リストを並行して取得
        const [reservationRes, operatorsRes] = await Promise.all([
          axios.get(`/api/reservations/${reservationId}`),
          axios.get('/api/operators'),
        ]);

        // 取得した予約データをフォームの初期値として設定
        console.log('予約詳細レスポンス:', reservationRes.data);
        const reservation = reservationRes.data.data || reservationRes.data; // dataキーがない場合に対応
        if (reservation) {
          setOperatorId(reservation.operator_id);
          setServiceId(reservation.service_id);
          await fetchServices(reservation.operator_id);
          setDuration(reservation.duration);
          setDate(reservation.date ? reservation.date.split('T')[0] : '');
          setStartTime(reservation.start_time ? reservation.start_time.substring(0, 5) : '');
          setNotes(reservation.notes || '');
        } else {
          setError('予約情報が取得できませんでした');
        }

        // 担当者リストを設定
        setOperators(operatorsRes.data.data);

      } catch (err) {
        console.error('Failed to fetch reservation data:', err);
        setError('予約情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchReservationData();
  }, [reservationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!user?.id) {
      setError('ユーザー情報の読み込みに失敗しました。再ログインしてください。');
      return;
    }

    if (!operator_id || !duration || !date || !start_time || !serviceId) {
      setError('必須項目をすべて入力してください。');
      return;
    }

    // 終了時間を自動計算
    const startTimeDate = new Date(`${date}T${start_time}`);
    startTimeDate.setMinutes(startTimeDate.getMinutes() + duration);
    const endHours = String(startTimeDate.getHours()).padStart(2, '0');
    const endMinutes = String(startTimeDate.getMinutes()).padStart(2, '0');
    const calculatedEndTime = `${endHours}:${endMinutes}`;

    try {
      const response = await axios.put(`/api/reservations/${reservationId}`, {
        user_id: user?.id,
        operator_id,
        service_id: serviceId,
        duration,
        date,
        start_time,
        end_time: calculatedEndTime,
        notes,
      });

      if (response.status === 200) {
        alert('予約を更新しました');
        navigate('/dashboard/reservations');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '予約の更新に失敗しました');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>予約編集</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="operator">担当者:</label>
          <select
            id="operator"
            value={operator_id ?? ''}
            onChange={(e) => {
              const id = Number(e.target.value);
              setOperatorId(id);
              fetchServices(id);
              setServiceId(null);
            }}
            required
            className="block w-full border rounded p-2"
          >
            <option value="">担当者を選択してください</option>
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>{operator.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="service">サービス:</label>
          <select
            id="service"
            value={serviceId ?? ''}
            onChange={(e) => setServiceId(Number(e.target.value))}
            required
            className="block w-full border rounded p-2"
          >
            <option value="">サービスを選択してください</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="duration">所要時間（分）:</label>
          <input
            type="number"
            id="duration"
            value={duration ?? ''}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            className="block w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date">日付:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="block w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start_time">開始時間:</label>
          <input
            type="time"
            id="start_time"
            value={start_time}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="block w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notes">備考:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full border rounded p-2"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">更新する</button>
      </form>
    </div>
  );
};

export default ReservationEdit;
