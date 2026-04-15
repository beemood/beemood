import { Casings } from '@beemood/types';
import { toCamelCase } from './to-camel-case.js';
import { toConstantCase } from './to-constant-case.js';
import { toKebabCase } from './to-kebab-case.js';
import { toNormalCase } from './to-normal-case.js';
import { toPascalCase } from './to-pascal-case.js';
import { toSnakeCase } from './to-snake-case.js';

export function names(name: string): Casings {
  return {
    normal: toNormalCase(name),
    contant: toConstantCase(name),
    kebab: toKebabCase(name),
    pascal: toPascalCase(name),
    camel: toCamelCase(name),
    snake: toSnakeCase(name),
  };
}
