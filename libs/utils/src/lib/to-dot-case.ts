import { toNormalCase } from './to-normal-case.js';

export function toDotCase(value: string) {
  return toNormalCase(value).replace(/\s/g, '.');
}
