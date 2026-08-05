import { toNormalCase } from './to-normal-case.js';

export function toSnakeCase(value: string) {
  return toNormalCase(value).replace(/\s/g, '_');
}
