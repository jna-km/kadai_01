import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const {
    user,
    operator,
    role,
    isLoading,
    setAuthState,
    setUserAndRole,
    checkLoginStatus
  } = useAuthStore();
  return {
    user,
    operator,
    role,
    isLoading,
    setAuthState,
    setUserAndRole,
    checkLoginStatus
  };
}
