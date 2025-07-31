import { useAuthStore } from '@/stores/authStoreOrg';

describe('useAuthStore', () => {
  test('初期状態が正しい', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.operator).toBeNull();
    expect(state.role).toBeNull();
    expect(state.isLoading).toBe(true);
  });
});
