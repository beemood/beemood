import { isInternalField } from './is-internal-field.js';
import { type Field } from './types.js';

export function isReadDtoField(field: Field) {
  return !field.isList && field.kind !== 'object' && !isInternalField(field);
}
