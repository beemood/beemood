import type { AuthPaths } from './auth-paths-type.js';

/**
 * RestApi authentication service path builder
 * @param prefix
 * @returns
 */
export function authPaths(prefix?: string): AuthPaths {
  const px = prefix ? prefix + '/' : '';
  return {
    login: `${px}login`,
    otp: `${px}login-otp`,
    logout: `${px}logout`,
    logoutAll: `${px}logout-all`,
    forgotPassword: `${px}forgot-password`,
    resetPassword: `${px}reset-password`,
    signup: `${px}signup`,
    hasSession: `${px}has-session`,
    hasPermission: `${px}has-permission`,
    hasRole: `${px}has-role`,
  };
}
