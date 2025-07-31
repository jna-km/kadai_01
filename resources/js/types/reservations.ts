export interface Reservation {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  notes?: string;
  // サービス情報を追加
  service?: {
    name: string;
    // 他に必要なプロパティがあれば追加
  };
}
