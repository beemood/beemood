import { Casings } from '@beemood/types';
import { toCamelCase } from './to-camel-case.js';
import { toConstantCase } from './to-constant-case.js';
import { toDotCase } from './to-dot-case.js';
import { toKebabCase } from './to-kebab-case.js';
import { toNormalCase } from './to-normal-case.js';
import { toPascalCase } from './to-pascal-case.js';
import { toSentenceCase } from './to-sentence-case.js';
import { toSnakeCase } from './to-snake-case.js';
import { toTitleCase } from './to-title-case.js';

export function names(name: string): Casings {
  name = toNormalCase(name);
  return {
    normal: toNormalCase(name),
    lower: name.toLowerCase(),
    upper: name.toUpperCase(),
    contant: toConstantCase(name),
    kebab: toKebabCase(name),
    pascal: toPascalCase(name),
    camel: toCamelCase(name),
    snake: toSnakeCase(name),
    sentence: toSentenceCase(name),
    title: toTitleCase(name),
    dot: toDotCase(name),
  };
}
