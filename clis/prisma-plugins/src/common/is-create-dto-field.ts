import { isInternalOperationField } from './is-internal-field.js';
import { Field } from './types.js';

export function isCreateDtoField(field: Field) {
  if (isInternalOperationField(field)) {
    return false;
  }

  return true;
}
