import { isEmptyString } from './is-empty-string.js';

export function uppercaseFirst(value: string): string {
  const first = value[0];

  if (first && !isEmptyString(first)) {
    return first.toUpperCase() + value.slice(1);
  }

  throw new Error(`Empty or untrimed string, "${value}"`);
}
