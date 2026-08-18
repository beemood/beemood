import { type Field } from './types.js';

export function isQueryField(field: Field) {
  return field.kind !== 'object';
}
