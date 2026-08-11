import { isInternalOperationField } from './is-internal-field.js';
import { isReadonlyField } from './is-readonly-field.js';
import { Field } from './types.js';

export function isUpdateDtoField(field: Field) {
  if (isInternalOperationField(field) || isReadonlyField(field)) {
    return false;
  }

  return true;
}
