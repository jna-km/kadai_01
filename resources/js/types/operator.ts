// Service型をimportして利用
import { Service } from './service';

export interface Operator {
  id: number;
  name: string;
  email: string;
  token?: string;
  reservations?: Reservation[];
  services: Service[]; // 型を統一
  workingHours?: WorkingHour[];
}

export interface OperatorPublic {
  id: number;
  name: string;
  services: Service[];
  workingHours: WorkingHour[];
}

export interface WorkingHour {
  id: number;
  day: string;        // 例: "monday"
  start_time: string; // "09:00"
  end_time: string;   // "18:00"
}

export interface Reservation {
  id: number;
  date: string;        // "2025-07-18"
  start_time: string;  // "07:41:33"
  end_time: string;    // "08:11:33"
  status: string;
  user: {
    id: number;
    name: string;
  };
  service_name: string;
}
