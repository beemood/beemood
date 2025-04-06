import { isDefinedOrThrow } from '@bmod/is';
import { normalize } from 'path';

export function lastSegment(filepath: string) {
  const lastItem = normalize(filepath).split('\\').pop();
  const result = isDefinedOrThrow(lastItem);
  return result;
}
