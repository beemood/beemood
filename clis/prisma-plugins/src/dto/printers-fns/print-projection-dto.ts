import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { type Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';

export function printProjectionDto(model: Model) {
  const dtoClassName = toDtoClassName(model.name, 'ProjectionDto');

  const selectDtoName = toDtoClassName(model.name, 'SelectDto');
  const omitDtoName = toDtoClassName(model.name, 'OmitDto');
  const includeDtoName = toDtoClassName(model.name, 'IncludeDto');
  const properites = [
    `@Prop() select?: ${selectDtoName}`,
    `@Prop() omit?: ${omitDtoName}`,
    `@Prop() include?: ${includeDtoName}`,
  ].join('\n');

  return printDtoClass(dtoClassName, properites);
}
