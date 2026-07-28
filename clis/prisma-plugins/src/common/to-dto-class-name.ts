export const ClassSuffixes = {
  ReadDto: 'ReadDto',
  CreateDto: 'CreateDto',
  CreateManyDto: 'CreateManyDto',
  UdpateDto: 'UdpateDto',
  UdpateManyDto: 'UdpateManyDto',
  FindManyDto: 'FindManyDto',
  FindUniqueDto: 'FindUniqueDto',
  ProjectionDto: 'ProjectionDto',
  SelectDto: 'SelectDto',
  OmitDto: 'OmitDto',
  IncludeDto: 'IncludeDto',
  OrderByDto: 'OrderByDto',
  WhereDto: 'WhereDto',
  WhereUniqueDto: 'WhereUniqueDto',
  WhereManyRelationDto: 'WhereManyRelationDto',
} as const;

export type DtoClassNameSuffix = keyof typeof ClassSuffixes;

export type DtoClassName = `${string}${DtoClassNameSuffix}`;

export function toDtoClassName(
  modelName: string,
  suffix: DtoClassNameSuffix,
): DtoClassName {
  return `${modelName}${suffix}`;
}
