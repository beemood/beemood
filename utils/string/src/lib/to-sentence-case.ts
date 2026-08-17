import { toNormalCase } from './to-normal-case.js';
import { uppercaseFirst } from './uppercase-first.js';

export function toSentenceCase(value: string) {
  return uppercaseFirst(toNormalCase(value));
}
