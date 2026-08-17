export const ClassNameSuffix = {
  Module: 'Module',
  Controller: 'Controller',
  Resolver: 'Resolver',
  Service: 'Service',
  Middleware: 'Middleware',
  Interceptor: 'Interceptor',
  Interface: 'Interface',
  Type: 'Type',
  Model: 'Model',
  Guard: 'Guard',
  Pipe: 'Pipe',
  Filter: 'Filter',
  Dto: 'Dto',
  FindManyDto: 'FindManyDto',
  FindOneDto: 'FindOneDto',
  CreateDto: 'CreateDto',
  UpdateDto: 'UpdateDto',
} as const;

export type ClassNameSuffix = keyof typeof ClassNameSuffix;
export const ClassNameSuffixExp = RegExp(
  `${Object.keys(ClassNameSuffix).join('|')}`,
);

export function extractResourceName(name: string): string {
  return name.replace(ClassNameSuffixExp, '');
}
