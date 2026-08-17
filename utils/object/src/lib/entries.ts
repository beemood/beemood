export function entries<T extends object>(value: T): [keyof T, unknown][] {
  return Object.entries(value) as [keyof T, unknown][];
}
