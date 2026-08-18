import { trim } from './trim.js';

export function isEmptyString(value: string): value is '' {
  return trim(value) === '';
}

export function isNotEmptyString(value: string): value is string {
  return trim(value) !== '';
}
