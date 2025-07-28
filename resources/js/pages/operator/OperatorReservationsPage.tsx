import React from 'react';
import { format } from 'date-fns';
import Sidebar from '../../components/operator/Sidebar';
import Header from '../../components/operator/Header';
import { useAuthStore } from '../../stores/authStore';
import { Operator } from '../../types/operator';

const OperatorReservationsPage: React.FC = () => {
  const operator = useAuthStore(state => state.operator) as Operator;
  const isLoading = useAuthStore(state => state.isLoading);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        データを読み込み中...
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        オペレーター情報を取得できませんでした。
      </div>
    );
  }

  const reservations = operator.reservations || [];

  const formatDateTime = (date: string, start: string, end: string) => {
    const formattedDate = format(new Date(date), 'yyyy/MM/dd');
    const startTime = start.slice(0, 5); // HH:mm
    const endTime = end.slice(0, 5); // HH:mm
    return `${formattedDate} ${startTime}〜${endTime}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">予約管理</h2>
          {reservations.length === 0 ? (
            <p className="text-gray-600">予約はまだありません。</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-left">日時</th>
                    <th className="border px-4 py-2 text-left">ユーザー</th>
                    <th className="border px-4 py-2 text-left">サービス</th>
                    <th className="border px-4 py-2 text-left">ステータス</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td className="border px-4 py-2">
                        {formatDateTime(reservation.date, reservation.start_time, reservation.end_time)}
                      </td>
                      <td className="border px-4 py-2">{reservation.user.name}</td>
                      <td className="border px-4 py-2">{reservation.service_name}</td>
                      <td className="border px-4 py-2">{reservation.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OperatorReservationsPage;
