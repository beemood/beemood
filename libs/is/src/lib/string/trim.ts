/**
 * Trim and replace multiple spaces with one in the string
 * @param value - string value
 * @returns - string
 */
export function trim(value: string) {
  return value.trim().replace(/\s{2,}/g, ' ');
}
