import { toSnakeCase } from './to-snake-case.js';

export function toConstantCase(value: string) {
  return toSnakeCase(value).toUpperCase();
}
