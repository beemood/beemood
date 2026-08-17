import { isEmptyString } from './is-empty-string.js';

export function lowercaseFirst(value: string) {
  const first = value[0];

  if (first && !isEmptyString(first)) {
    return first.toLowerCase() + value.slice(1);
  }

  throw new Error(`Empty or untrimed string, "${value}"`);
}
