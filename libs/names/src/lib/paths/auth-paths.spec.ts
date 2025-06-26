import { authPaths } from './auth-paths.js';

describe('authPaths', () => {
  it('should create all auth paths', () => {
    expect(authPaths()).toEqual({
      login: 'login',
      otp: 'login-otp',
      logout: 'logout',
      logoutAll: 'logout-all',
      forgotPassword: 'forgot-password',
      resetPassword: 'reset-password',
      signup: 'signup',
      hasSession: 'has-session',
      hasPermission: 'has-permission',
      hasRole: 'has-role',
    });
  });
  it('should create all auth paths with prefix', () => {
    expect(authPaths('auth')).toEqual({
      login: 'auth/login',
      otp: 'auth/login-otp',
      logout: 'auth/logout',
      logoutAll: 'auth/logout-all',
      forgotPassword: 'auth/forgot-password',
      resetPassword: 'auth/reset-password',
      signup: 'auth/signup',
      hasSession: 'auth/has-session',
      hasPermission: 'auth/has-permission',
      hasRole: 'auth/has-role',
    });
  });
});
