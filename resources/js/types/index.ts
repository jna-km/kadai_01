export interface User {
  id: number;
  name: string;
  email: string;
  // 他のユーザー特有のプロパティがあればここに追加
}

export interface Operator {
  id: number;
  name: string;
  email: string;
  // 他のオペレーター特有のプロパティがあればここに追加
}

export interface AuthContextType {
  user: User | Operator | null;
  role: 'user' | 'operator' | null;
  setUserAndRole: (user: User | Operator | null, role: 'user' | 'operator' | null) => void;
  isLoading: boolean;
}
