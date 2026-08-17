import { toNormalCase } from './to-normal-case.js';
import { uppercaseFirst } from './uppercase-first.js';

export function toTitleCase(value: string) {
  return toNormalCase(value).split(/\s/).map(uppercaseFirst).join(' ');
}
