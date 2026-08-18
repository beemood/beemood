import { isQueryField } from '../../common/is-query-field.js';
import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { type Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printWhereDtoProperty } from './print-where-dto-property.js';

export function printWhereDto(model: Model) {
  const fields = model.fields.filter(isQueryField);

  const dtoClassName = toDtoClassName(model.name, 'WhereDto');

  const dtoProperties = fields.map(printWhereDtoProperty).join('\n');

  return printDtoClass(dtoClassName, dtoProperties);
}
