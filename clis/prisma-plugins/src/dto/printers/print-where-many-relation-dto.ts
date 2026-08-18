import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { type Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';

export function printWhereManyRelationDto(model: Model) {
  const dtoClassName = toDtoClassName(model.name, 'WhereManyRelationDto');

  const whereDtoClassName = toDtoClassName(model.name, 'WhereDto');

  const properties = [
    `@Prop() every: ${whereDtoClassName}`,
    `@Prop() some?:${whereDtoClassName}`,
    `@Prop() none?:${whereDtoClassName}`,
  ].join('\n');

  return printDtoClass(dtoClassName, properties);
}
