// resources/js/pages/Reservations.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Reservation } from '../types';

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/reservations');
        setReservations(response.data.data);
      } catch (err: any) {
        setError('データの取得に失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>予約一覧</h2>
      <Link to="/dashboard/reservations/new">
        <button>新規予約</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>サービス名</th>
            <th>日付</th>
            <th>開始時間</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.service_name}</td>
              <td>{r.date}</td>
              <td>{r.start_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
