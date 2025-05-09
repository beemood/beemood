export interface ClassType<T> {
  new (...args: unknown[]): T;
}
