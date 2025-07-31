import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Operator, WorkingHour } from '@/types/operator';
import { ApiResponse } from '@/types/api';

const dayMap: { [key: string]: string } = {
  sunday: '日曜日',
  monday: '月曜日',
  tuesday: '火曜日',
  wednesday: '水曜日',
  thursday: '木曜日',
  friday: '金曜日',
  saturday: '土曜日',
};

const OperatorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const response = await axios.get<ApiResponse<Operator>>(`/api/operator/${id}`);
        setOperator(response.data.data);
      } catch (err: any) {
        setError('オペレーター情報の取得に失敗しました。' + (err?.message ? ` (${err.message})` : ''));
      } finally {
        setLoading(false);
      }
    };
    fetchOperator();
  }, [id]);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;
  if (!operator) return <div>データが見つかりません</div>;

  return (
    <div>
      <h2>{operator.name}</h2>

      <h3>サービス一覧</h3>
      <ul>
        {operator.services?.map((service) => (
          <li key={service.id}>
            {service.name}（{service.duration}分）
          </li>
        ))}
      </ul>

      <h3>営業時間</h3>
      <ul>
        {operator.workingHours && operator.workingHours.length > 0 ? (
          operator.workingHours.map((wh: WorkingHour, index: number) => (
            <li key={index}>
              {dayMap[wh.day] ?? wh.day}: {wh.start_time} - {wh.end_time}
            </li>
          ))
        ) : (
          <li>営業時間情報なし</li>
        )}
      </ul>

      <Link to="/operators">一覧に戻る</Link>
    </div>
  );
};

export default OperatorDetailPage;
