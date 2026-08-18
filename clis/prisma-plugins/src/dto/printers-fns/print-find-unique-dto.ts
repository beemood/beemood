import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { type Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';

export function printFindUniquedto(model: Model) {
  const findManyDtoName = toDtoClassName(model.name, 'FindUniqueDto');
  const extending = toDtoClassName(model.name, 'ProjectionDto');
  const whereDtoName = toDtoClassName(model.name, 'WhereUniqueDto');

  const dtoProperties = [`@Prop() where: ${whereDtoName}`].join('\n');

  return printDtoClass(findManyDtoName, dtoProperties, extending);
}
