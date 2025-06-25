/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ClassLike<T extends object = any> {
  new (...args: any[]): T;
}
