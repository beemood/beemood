import { isQueryField } from '../../common/is-query-field.js';
import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printWhereUniqueDtoProperty } from './print-where-unique-dto-property.js';

export function printWhereUniqueDto(model: Model) {
  const fields = model.fields.filter(isQueryField);

  const dtoClassName = toDtoClassName(model.name, 'WhereUniqueDto');

  const dtoProperties = fields.map(printWhereUniqueDtoProperty).join('\n');

  return printDtoClass(dtoClassName, dtoProperties);
}
