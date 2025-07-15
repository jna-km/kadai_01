import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Operator {
  id: number;
  name: string;
}

const ReservationEdit: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service_name, setServiceName] = useState('');
  const [operators, setOperators] = useState<Operator[]>([]);
  const [operator_id, setOperatorId] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [start_time, setStartTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
        const reservation = reservationRes.data.data;
        setServiceName(reservation.service_name);
        setOperatorId(reservation.operator_id);
        setDuration(reservation.duration);
        setDate(reservation.date.split('T')[0]); // 'YYYY-MM-DD' 形式にフォーマット
        setStartTime(reservation.start_time.substring(0, 5)); // 'HH:mm' 形式にフォーマット
        setNotes(reservation.notes || '');

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

    if (!operator_id || !duration || !date || !start_time) {
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
        service_name,
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
        <div>
          <label htmlFor="service_name">サービス名:</label>
          <input type="text" id="service_name" value={service_name} onChange={(e) => setServiceName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="operator">担当者:</label>
          <select id="operator" value={operator_id ?? ''} onChange={(e) => setOperatorId(Number(e.target.value))} required >
            <option value="">担当者を選択してください</option>
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>{operator.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="duration">所要時間（分）:</label>
          <input type="number" id="duration" value={duration ?? ''} onChange={(e) => setDuration(Number(e.target.value))} required />
          <label htmlFor="date">日付:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="start_time">開始時間:</label>
          <input type="time" id="start_time" value={start_time} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="notes">備考:</label>
          <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">更新する</button>
      </form>
    </div>
  );
};

export default ReservationEdit;
