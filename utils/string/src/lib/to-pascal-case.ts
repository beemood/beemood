import { toNormalCase } from './to-normal-case.js';
import { uppercaseFirst } from './uppercase-first.js';

export function toPascalCase(value: string) {
  return toNormalCase(value)
    .replace(/[_-]{1,}/g, ' ')
    .split(/\s/)
    .map(uppercaseFirst)
    .join('');
}
