import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Reservation } from '../../types/reservations';
import { format, parseISO } from 'date-fns';

interface ApiResponse<T> {
  data: T;
  // 他の必要なプロパティ
}

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<ApiResponse<Reservation[]>>('/api/my-reservations');
        console.log(response.data.data)
        setReservations(response.data.data); // dataプロパティを指定
        setError(null);
      } catch (err) {
        console.error('Failed to fetch reservations:', err);
        setError('予約情報の取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleDelete = async (id: number) => {
    // 1. 確認ダイアログを表示
    if (window.confirm('この予約を本当に削除しますか？')) {
      try {
        // 2. APIリクエストを実行
        await axios.delete(`/api/reservations/${id}`);
        // 3. 成功したら画面のリストから削除
        setReservations(reservations.filter((reservation) => reservation.id !== id));
      } catch (err) {
        console.error('Failed to delete reservation:', err);
        setError('予約の削除に失敗しました。');
      }
    }
  };
  // 日付を 'YYYY-MM-DD' 形式にフォーマットするヘルパー関数
  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">予約一覧</h2>
        <Link to="/user/reservations/create">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            新規予約
          </button>
        </Link>
      </div>

      {reservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b text-left">サービス名</th>
                <th className="py-2 px-4 border-b text-left">予約日</th>
                <th className="py-2 px-4 border-b text-left">時間</th>
                <th className="py-2 px-4 border-b text-left">備考</th>
                <th className="py-2 px-4 border-b">操作</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{reservation.id}</td>
                  <td className="py-2 px-4 border-b">
                    {reservation.service ? reservation.service.name : '未設定'}
                  </td>
                  <td className="py-2 px-4 border-b">{format(parseISO(reservation.date), 'yyyy-MM-dd')}</td>
                  <td className="py-2 px-4 border-b">{reservation.start_time.substring(0, 5)} - {reservation.end_time.substring(0, 5)}</td>
                  <td className="py-2 px-4 border-b">{reservation.notes}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link to={`/user/reservations/edit/${reservation.id}`}>
                      <button>編集</button>
                    </Link>
                    <button onClick={() => handleDelete(reservation.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p>現在、予約はありません。</p>
        </div>
      )}
    </div>
  );
};

export default Reservations;
