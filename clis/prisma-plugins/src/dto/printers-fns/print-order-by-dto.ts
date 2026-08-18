import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { type Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printOrderByDtoProperty } from './print-order-by-dto-property.js';

export function printOrderByDto(model: Model) {
  const dtoFields = model.fields.filter(
    (f) => f.kind !== 'object' && !f.isList,
  );

  const dtoClassName = toDtoClassName(model.name, 'OrderByDto');

  const dtoProperties = dtoFields.map(printOrderByDtoProperty).join('\n');

  return printDtoClass(dtoClassName, dtoProperties);
}
