import { type Field } from './types.js';

export function isReadonlyField(field: Field) {
  return /@readonly/gi.test(field.documentation ?? '');
}
