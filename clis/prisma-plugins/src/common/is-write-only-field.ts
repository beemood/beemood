import { type Field } from './types.js';

export function isWriteonlyField(field: Field) {
  return /@writeonly/gi.test(field.documentation ?? '');
}
