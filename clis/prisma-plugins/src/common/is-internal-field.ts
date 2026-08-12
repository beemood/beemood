import { DMMF } from '@prisma/generator-helper';
import { isTimestampField } from './is-timestamp-field.js';
import { Field } from './types.js';

export function isInternalField(field: Field) {
  return /@internal/gi.test(field.documentation ?? '');
}

/**
 * Check the {@link Field} is internaly managed or not. The timestamp fields, field with "@internal" annotation, and "relation-object" fields are considered internal
 *
 * @param field {@link Field}
 * @returns boolean
 */
export function isInternalOperationField(field: Field): boolean {
  return (
    field.isId ||
    isTimestampField(field) ||
    field.kind === 'object' ||
    isInternalField(field) ||
    (field.default as DMMF.FieldDefault)?.name === 'uuid'
  );
}
