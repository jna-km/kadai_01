import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  duration: number;
}

interface WorkingHour {
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Operator {
  id: number;
  name: string;
  services: Service[];
  working_hours: WorkingHour[];
}

const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];

const OperatorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [operator, setOperator] = useState<Operator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const response = await axios.get(`/api/public/operators/${id}`);
        setOperator(response.data.data);
      } catch (err) {
        setError('オペレーター情報の取得に失敗しました。');
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
        {operator.services.map((service) => (
          <li key={service.id}>
            {service.name}（{service.duration}分）
          </li>
        ))}
      </ul>

      <h3>営業時間</h3>
      <ul>
        {operator.working_hours && operator.working_hours.length > 0 ? (
          operator.working_hours.map((wh, index) => (
            <li key={index}>
              {days[wh.day_of_week]}: {wh.start_time} - {wh.end_time}
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
