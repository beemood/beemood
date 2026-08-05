import { toNormalCase } from './to-normal-case.js';

export function toKebabCase(value: string) {
  return toNormalCase(value).replace(/\s/g, '-');
}
