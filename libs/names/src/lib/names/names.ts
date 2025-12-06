import {
  lowerCaseFirst,
  normalizeName,
  upperCaseFirst,
} from './normalize-name.js';

export type NameCases = {
  pascal: string;
  camel: string;
  snake: string;
  kebab: string;
  screamingSnake: string;
  title: string;
  sentence: string;
};

function toPascal(name: string) {
  return name.split(' ').map(upperCaseFirst).join('');
}

function toCamel(name: string) {
  return lowerCaseFirst(toPascal(name));
}

function toKebab(name: string) {
  return name.replace(/\s{1,}/g, '-');
}

function toSnake(name: string) {
  return name.replace(/\s{1,}/g, '_');
}

function toTitle(name: string) {
  return name.split(' ').map(upperCaseFirst).join(' ');
}
export function names(name: string): NameCases {
  name = normalizeName(name);

  const camel = toCamel(name);
  const pascal = toPascal(name);
  const kebab = toKebab(name);
  const snake = toSnake(name);
  const screamingSnake = snake.toUpperCase();
  const sentence = upperCaseFirst(name);
  const title = toTitle(name);

  return {
    camel,
    kebab,
    pascal,
    screamingSnake,
    sentence,
    snake,
    title,
  };
}
