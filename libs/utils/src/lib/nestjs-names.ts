import { names } from './names.js';

export const NestjsNameSuffix = {
  Module: 'Module',
  Controller: 'Controller',
  Resolver: 'Resolver',
  Service: 'Service',
  Middleware: 'Middleware',
  Interceptor: 'Interceptor',
  Guard: 'Guard',
} as const;

export type NestjsNameSuffix = keyof typeof NestjsNameSuffix;
export const NestjsNameSuffixExp = RegExp(
  `/${Object.keys(NestjsNameSuffix).join('|')}/`,
);

export function nestjsNames(className: string) {
  const resourceName = className.replace(NestjsNameSuffixExp, '');
  return names(resourceName);
}
