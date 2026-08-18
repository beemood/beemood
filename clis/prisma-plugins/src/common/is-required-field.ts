import { isInternalOperationField } from './is-internal-field.js';
import { type Field } from './types.js';

export function isRequiredField(field: Field) {
  if (
    isInternalOperationField(field) ||
    field.hasDefaultValue ||
    field.isList
  ) {
    return false;
  }

  return !!field.isRequired;
}
