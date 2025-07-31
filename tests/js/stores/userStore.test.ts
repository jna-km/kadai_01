import { useUserStore } from '@/stores/userStore';

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.getState().reset();
  });

  test('初期状態が正しい', () => {
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('setUserでuserがセットされる', () => {
    const dummyUser = { id: 1, name: 'テストユーザー' } as any;
    useUserStore.getState().setUser(dummyUser);
    expect(useUserStore.getState().user).toEqual(dummyUser);
  });

  test('setLoadingでisLoadingが切り替わる', () => {
    useUserStore.getState().setLoading(true);
    expect(useUserStore.getState().isLoading).toBe(true);
    useUserStore.getState().setLoading(false);
    expect(useUserStore.getState().isLoading).toBe(false);
  });

  test('setErrorでerrorがセットされる', () => {
    useUserStore.getState().setError('エラー発生');
    expect(useUserStore.getState().error).toBe('エラー発生');
  });

  test('resetで初期状態に戻る', () => {
    useUserStore.getState().setUser({ id: 2, name: 'ユーザー2' } as any);
    useUserStore.getState().setLoading(true);
    useUserStore.getState().setError('エラー');
    useUserStore.getState().reset();
    const state = useUserStore.getState();
    expect(state.user).toBeNull();
});
});
