import { isEmptyString } from './is-empty-string.js';
import { trim } from './trim.js';

/**
 * Transform the given {@link value} into a normal lowercase string by replacing extra space and pascal cases by a single space
 * @param value
 * @returns
 */
export function toNormalCase(value: string) {
  const trimmedValue = trim(value);

  if (isEmptyString(trimmedValue)) {
    throw new Error(`Empty string`);
  }

  return trimmedValue
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .toLowerCase();
}
