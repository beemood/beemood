import { lowercaseFirst } from './lowercase-first.js';
import { toPascalCase } from './to-pascal-case.js';

export function toCamelCase(value: string) {
  return lowercaseFirst(toPascalCase(value));
}
