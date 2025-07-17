/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 */

export interface User {
  id: number;
  name: string;
  email: string;
  reservations?: UserReservation[];
}

export interface UserReservation {
  id: number;
  reserved_at: string;
  status: string;
  service: {
    id: number;
    name: string;
  };
}
