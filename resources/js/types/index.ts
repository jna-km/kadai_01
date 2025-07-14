export interface User {
  id: number;
  name: string;
  email: string;
  // 必要に応じて他のプロパティを追加
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}
