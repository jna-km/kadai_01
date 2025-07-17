import { User } from './user';
import { Operator } from './operator';

export interface AuthContextType {
  user: User | null;
  operator: Operator | null;
  role: 'user' | 'operator' | null;
  isLoading: boolean;
  setAuthState: (
    user: User | null,
    operator: Operator | null,
    role: 'user' | 'operator' | null
  ) => void;
}
