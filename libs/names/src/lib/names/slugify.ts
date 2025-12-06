import { normalizeName } from './normalize-name.js';

/**
 * Replace all special chracters with dash and lowercase
 * @param value string
 * @returns slug string that only contains lowercase letters and dash
 */
export function slugify(value: string): string {
  value = value.replace(/[^a-zA-Z _-]/g, ' ');
  return normalizeName(value).split(' ').join('-');
}
