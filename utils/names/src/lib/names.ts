import { normalize } from './normalize.js';

/**
 * Casing variants
 */
export type Names = {
  /**
   * snake_case
   */
  snakeCase: string;
  /**
   * SCREAMING_SNAKE_CASE
   */
  screamingSnakeCase: string;
  /**
   * camelCase
   */
  camelCase: string;

  /**
   * kebab-caes
   */
  kebabCase: string;
  /**
   * PascalCase
   */
  pascalCase: string;
  /**
   * Title Case
   */
  titleCase: string;

  /**
   * Sentence case
   */
  sentenceCase: string;
};

function camelCase(name: string): string {
  return name
    .split('-')
    .map((e, index) => {
      if (index == 0) {
        return e;
      }
      return e[0].toUpperCase() + e.slice(1);
    })
    .join('');
}

function snakeCase(name: string) {
  return name.replace(/-/g, '_');
}

function screamingSnakeCase(name: string) {
  return name.split('-').join('_').toUpperCase();
}

function pascalCase(name: string): string {
  return name
    .split('-')
    .map((e) => {
      return e[0].toUpperCase() + e.slice(1);
    })
    .join('');
}

function kebabCase(name: string) {
  return name;
}

function titleCase(name: string) {
  return name
    .split('-')
    .map((e) => {
      return e[0].toUpperCase() + e.slice(1);
    })
    .join(' ');
}

function sentenceCase(name: string) {
  name = name.split('-').join(' ');
  return name[0].toUpperCase() + name.slice(1);
}

/**
 * Create all casing variants of the given string value
 * @param name string
 * @returns names {@link Names}
 */
export function names(name: string): Names {
  name = normalize(name);
  return {
    snakeCase: snakeCase(name),
    camelCase: camelCase(name),
    kebabCase: kebabCase(name),
    pascalCase: pascalCase(name),
    titleCase: titleCase(name),
    screamingSnakeCase: screamingSnakeCase(name),
    sentenceCase: sentenceCase(name),
  };
}
