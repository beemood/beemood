import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printProjectionDtoProperty } from './print-projection-dto-property.js';

export function printIncludedto(model: Model) {
  const dtoFields = model.fields.filter((e) => e.kind === 'object');

  const dtoClassName = toDtoClassName(model.name, 'IncludeDto');

  const dtoProperties = dtoFields.map(printProjectionDtoProperty).join('\n');

  return printDtoClass(dtoClassName, dtoProperties);
}
