// resources/js/pages/ReservationCreate.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Operator {
  id: number;
  name: string;
}

const ReservationCreate: React.FC = () => {
  const [service_name, setServiceName] = useState('');
  const [operators, setOperators] = useState<Operator[]>([]);
  const [operator_id, setOperatorId] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get('/api/operators'); // Assuming you have an endpoint to get operators
        setOperators(response.data.data);
      } catch (error) {
        console.error('Failed to fetch operators:', error);
        setError('オペレーターの取得に失敗しました'); // "Failed to get operators"
      } finally {
        setLoading(false);
      }
    };
    fetchOperators();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!operator_id || !duration) {
      setError('オペレーターと所要時間は必須です'); // "Operator and duration are required"
      return;
    }

    try {
      const response = await axios.post('/api/reservations', {
        user_id: user?.id, // Add user_id here
        operator_id,
        service_name,
        duration,
        date,
        start_time,
        end_time,
        notes,
      });
      if (response.status === 201) {
        alert('予約が完了しました'); // "Reservation completed"
        navigate('/dashboard/reservations');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '予約に失敗しました'); // "Reservation failed"
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div>
      <h2>新規予約</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="service_name">サービス名:</label>
          <input type="text" id="service_name" value={service_name} onChange={(e) => setServiceName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="operator">担当者:</label>
          <select
            id="operator"
            value={operator_id !== null ? operator_id : ''}
            onChange={(e) => setOperatorId(Number(e.target.value))}
            required
          >
            <option value="">担当者を選択してください</option>  {/* "Please select an operator" */}
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="duration">所要時間（分）:</label>
          <input type="number" id="duration" value={duration !== null ? duration : ''} onChange={(e) => setDuration(Number(e.target.value))} required />
          <label htmlFor="date">日付:</label>
          <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="start_time">開始時間:</label>
          <input type="time" id="start_time" value={start_time} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="end_time">終了時間:</label>
          <input type="time" id="end_time" value={end_time} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="notes">備考:</label>
          <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">予約する</button>
      </form>
      </div>
    );
  }
};

export default ReservationCreate;
