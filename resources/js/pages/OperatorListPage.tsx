import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Operator {
  id: number;
  name: string;
}

const OperatorListPage: React.FC = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get('/api/public/operators');
        setOperators(response.data.data);
      } catch (err) {
        setError('オペレーター一覧の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchOperators();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>オペレーター一覧</h2>
      <ul>
        {operators.map((op) => (
          <li key={op.id}>
            <Link to={`/operators/${op.id}`}>{op.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OperatorListPage;
