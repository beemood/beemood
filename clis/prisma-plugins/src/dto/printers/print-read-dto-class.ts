import { isReadDtoField } from '../../common/is-read-dto-field.js';
import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { type Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printDtoProperty } from './print-dto-property.js';

export function printReadDtoClass(model: Model) {
  const dtoFields = model.fields.filter(isReadDtoField);

  const dtoClassName = toDtoClassName(model.name, 'ReadDto');

  const dtoProperties = dtoFields
    .map((field) => printDtoProperty(field, false))
    .join('\n');

  return printDtoClass(dtoClassName, dtoProperties);
}
