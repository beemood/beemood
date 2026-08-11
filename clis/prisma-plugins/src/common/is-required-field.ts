import { isInternalOperationField } from './is-internal-field.js';
import { Field } from './types.js';
export function isRequiredField(field: Field) {
  if (isInternalOperationField(field) || field.hasDefaultValue) {
    return false;
  }

  return true;
}
