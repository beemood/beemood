import { Field } from '../common/dmmf.js';
import { toTsType } from '../common/to-ts-type.js';

export function printDtoProperty(field: Field) {
  const type = toTsType(field);
  const isRequired = field.isRequired ? '' : '?';

  return `${field.name}${isRequired}: ${type}`;
}
