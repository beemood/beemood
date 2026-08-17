export function values<T extends object>(value: T): unknown[] {
  return Object.values(value);
}
