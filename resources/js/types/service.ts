export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  price: number;
  operator_id?: number;
  created_at?: string;
  updated_at?: string;
}
