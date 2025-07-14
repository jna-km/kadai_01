// resources/js/pages/Reservations.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Reservation = {
  id: number;
  service_name: string;
  date: string;
};

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                await axios.get('/sanctum/csrf-cookie', { withCredentials: true });


                const response = await axios.get('/api/my-reservations', {
                    withCredentials: true
                });
                console.log(response.data);
                setReservations(response.data);
            } catch (error) {
                console.log("aaa");
                console.error(error);
            }
        };

        fetchReservations();
    }, []);

  return (
    <div>
      <h2>予約一覧</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>サービス名</th>
            <th>日付</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.service_name}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
