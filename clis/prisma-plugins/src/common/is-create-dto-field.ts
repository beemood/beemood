import { isInternalOperationField } from './is-internal-field.js';
import { type Field } from './types.js';

export function isCreateDtoField(field: Field) {
  if (isInternalOperationField(field)) {
    return false;
  }

  return true;
}
