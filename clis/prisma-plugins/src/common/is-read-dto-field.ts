import { isInternalField } from './is-internal-field.js';
import { Field } from './types.js';

export function isReadDtoField(field: Field) {
  return !isInternalField(field);
}
