import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';

export function printFindManyDto(model: Model) {
  const modelName = model.name;

  const findManyDtoName = toDtoClassName(model.name, 'FindManyDto');
  const extending = toDtoClassName(model.name, 'ProjectionDto');
  const orderByDtoName = toDtoClassName(model.name, 'OrderByDto');

  const whereUniqueDtoName = toDtoClassName(model.name, 'WhereUniqueDto');

  const dtoProperties = [
    `@Prop() cursor?: ${whereUniqueDtoName}`,
    `@Prop({ moreThan: 0 , format:'int', defaultValue: 20 }) take?: number`,
    `@Prop({ moreThanOrEqualTo: 0 , format:'int', defaultValue: 0 }) skip?: number`,
    `@Prop({ isIn: Object.keys(P.Prisma.UserScalarFieldEnum) }) distinct?: P.Prisma.${modelName}ScalarFieldEnum`,
    `@Prop() orderBy?: ${orderByDtoName}`,
  ].join('\n');

  return printDtoClass(findManyDtoName, dtoProperties, extending);
}
