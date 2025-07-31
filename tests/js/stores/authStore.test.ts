import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/stores/authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.getState().setAuthState(null, null, null);
    });
  });

  test('初期状態が正しい', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.operator).toBeNull();
    expect(state.role).toBeNull();
  });

  test('setAuthStateでuser/operator/roleがセットされる', () => {
    const dummyUser = { id: 1, name: 'ユーザー' };
    const dummyOperator = { id: 2, token: 'abc' };
    act(() => {
      useAuthStore.getState().setAuthState(dummyUser, dummyOperator, 'operator');
    });
    const state = useAuthStore.getState();
    expect(state.user).toEqual(dummyUser);
    expect(state.operator).toEqual(dummyOperator);
    expect(state.role).toBe('operator');
  });
});
