// filepath: /Users/murako/Documents/jna/kadai_01/tests/js/stores/operatorStore.test.ts
import { useOperatorStore } from '@/stores/operatorStore';

describe('useOperatorStore', () => {
  beforeEach(() => {
    useOperatorStore.getState().reset();
  });

  test('初期状態が正しい', () => {
    const state = useOperatorStore.getState();
    expect(state.operator).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('updateStateでoperatorがセットされる', () => {
    const dummyOperator = { id: 1, token: 'abc' } as any;
    useOperatorStore.getState().updateState({ operator: dummyOperator });
    expect(useOperatorStore.getState().operator).toEqual(dummyOperator);
  });
});
