import axios from 'axios';
import { createAuthMethods } from '@/stores/authMethods';

describe('authMethods', () => {
    let state: any;
    let set: (s: any) => void;

    beforeEach(() => {
        state = {};
        set = (s) => Object.assign(state, s);
        sessionStorage.clear();
        axios.defaults.headers.common = {};
    });

    test('setAuthState operator時にトークンがセットされる', () => {
        const methods = createAuthMethods(set);
        const operator = { token: 'abc123' };
        methods.setAuthState(null, operator, 'operator');
        expect(sessionStorage.getItem('operator_token')).toBe('abc123');
        expect(axios.defaults.headers.common['Authorization']).toBe('Bearer abc123');
        expect(state.operator).toEqual(operator);
        expect(state.role).toBe('operator');
    });

    test('setAuthState user時にトークンが解除される', () => {
        const methods = createAuthMethods(set);
        sessionStorage.setItem('operator_token', 'abc123');
        axios.defaults.headers.common['Authorization'] = 'Bearer abc123';
        methods.setAuthState({ id: 1 }, null, 'user');
        expect(sessionStorage.getItem('operator_token')).toBeNull();
        expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
        expect(state.user).toEqual({ id: 1 });
        expect(state.role).toBe('user');
    });

    test('setAuthState role=null時に全てクリアされる', () => {
        const methods = createAuthMethods(set);
        sessionStorage.setItem('operator_token', 'abc123');
        axios.defaults.headers.common['Authorization'] = 'Bearer abc123';
        methods.setAuthState(null, null, null);
        expect(sessionStorage.getItem('operator_token')).toBeNull();
        expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
        expect(state.user).toBeNull();
        expect(state.operator).toBeNull();
        expect(state.role).toBeNull();
    });

    test('setUserAndRole user時にoperator情報がクリアされる', () => {
        const methods = createAuthMethods(set);
        sessionStorage.setItem('operator_token', 'abc123');
        axios.defaults.headers.common['Authorization'] = 'Bearer abc123';
        methods.setUserAndRole({ id: 2 }, 'user');
        expect(sessionStorage.getItem('operator_token')).toBeNull();
        expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
        expect(state.user).toEqual({ id: 2 });
        expect(state.operator).toBeNull();
        expect(state.role).toBe('user');
    });

    test('setUserAndRole operator時にoperator情報がセットされる', () => {
        const methods = createAuthMethods(set);
        const operator = { token: 'op456', name: 'test' };
        methods.setUserAndRole(operator as any, 'operator');
        expect(sessionStorage.getItem('operator_token')).toBe('op456');
        expect(axios.defaults.headers.common['Authorization']).toBe('Bearer op456');
        expect(state.user).toBeNull();
        expect(state.operator).toEqual(operator);
        expect(state.role).toBe('operator');
    });

    test('setUserAndRole role=null時に全てクリアされる', () => {
        const methods = createAuthMethods(set);
        sessionStorage.setItem('operator_token', 'abc123');
        axios.defaults.headers.common['Authorization'] = 'Bearer abc123';
        methods.setUserAndRole(null, null);
        expect(sessionStorage.getItem('operator_token')).toBeNull();
        expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
        expect(state.user).toBeNull();
        expect(state.operator).toBeNull();
        expect(state.role).toBeNull();
    });


  test('setAuthState user時にトークンが解除される', () => {
    const methods = createAuthMethods(set);
    sessionStorage.setItem('operator_token', 'abc123');
    axios.defaults.headers.common['Authorization'] = 'Bearer abc123';
    methods.setAuthState({ id: 1 }, null, 'user');
    expect(sessionStorage.getItem('operator_token')).toBeNull();
    expect('Authorization' in axios.defaults.headers.common).toBe(false);
    expect(state.user).toEqual({ id: 1 });
    expect(state.role).toBe('user');
  });
});
