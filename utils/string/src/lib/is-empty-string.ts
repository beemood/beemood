import { trim } from './trim.js';

export function isEmptyString(value: string): value is '' {
  return trim(value) === '';
}
