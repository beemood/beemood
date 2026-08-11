import { isCreateDtoField } from '../../common/is-create-dto-field.js';
import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printDtoProperty } from './print-dto-property.js';

export function printCreateDtoClass(model: Model) {
  const dtoFields = model.fields.filter(isCreateDtoField);

  const dtoClassName = toDtoClassName(model.name, 'CreateDto');

  const dtoProperties = dtoFields
    .map((field) => printDtoProperty(field))
    .join('\n');
  return printDtoClass(dtoClassName, dtoProperties);
}
