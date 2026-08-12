import { isUpdateDtoField } from '../../common/is-update-dto-field.js';
import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printDtoProperty } from './print-dto-property.js';

export function printUpdateDtoClass(model: Model) {
  const dtoFields = model.fields.filter(isUpdateDtoField);

  const dtoClassName = toDtoClassName(model.name, 'UdpateDto');

  const dtoProperties = dtoFields
    .map((field) => printDtoProperty(field, false))
    .join('\n');

  return printDtoClass(dtoClassName, dtoProperties);
}
