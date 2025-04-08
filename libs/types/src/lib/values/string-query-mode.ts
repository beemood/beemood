import type { Optional } from '../condition/optional.js';
export type StringQueryMode = 'default' | 'insensitive';

export function StringQueryMode(
  value?: StringQueryMode
): Optional<StringQueryMode> {
  return value;
}
