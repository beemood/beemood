/**
 * Find the difference between {@link first} and {@link second} array.
 *
 * @param first
 * @param second
 * @returns
 */
export function diff<T>(first: T[], second: T[]): T[] {
  return [
    ...first.filter((e) => !second.includes(e)),
    ...second.filter((e) => !first.includes(e)),
  ];
}
