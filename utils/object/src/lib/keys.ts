export function keys<T extends object>(value: T): (keyof T)[] {
  return Object.keys(value) as (keyof T)[];
}
