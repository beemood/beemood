export const ClassSuffixes = {
  CreateDto: 'CreateDto',
  CreateManyDto: 'CreateManyDto',
  UdpateDto: 'UdpateDto',
  UdpateManyDto: 'UdpateManyDto',
  QueryDto: 'QueryDto',
  ProjectionDto: 'ProjectionDto',
  OrderByDto: 'OrderByDto',
} as const;

export type DtoClassNameSuffix = keyof typeof ClassSuffixes;

export type DtoClassName = `${string}${DtoClassNameSuffix}`;

export function toDtoClassName(
  modelName: string,
  suffix: DtoClassNameSuffix,
): DtoClassName {
  return `${modelName}${suffix}`;
}
