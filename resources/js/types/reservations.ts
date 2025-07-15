export interface Reservation {
  id: number;
  service_name: string;
  date: string;
  start_time: string;
  end_time: string;
  notes: string | null;
  // バックエンドのモデルに含まれる他のカラムも必要に応じて追加できます
  // created_at: string;
  // user?: User; // ネストされたユーザー情報など
}
