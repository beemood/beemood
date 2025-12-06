import { InvalidNameError } from '@beemood/errors';
import { trim } from './trim.js';

export const VALID_NAME_EXP = () => /^[a-zA-Z\-_]{1,}[a-zA-Z\-_\s]{1,}$/;
export const HAS_UPPER_CASE_EXP = () => /[A-Z]{1,}/;
export const HAS_LOWER_CASE_EXP = () => /[a-z]{1,}/;
export const HAS_UNDER_SCORE_EXP = () => /[_]{1,}/;
export const HAS_DASH_EXP = () => /[-]{1,}/;

export function isValidName(name: string) {
  return VALID_NAME_EXP().test(name);
}

export function isValidNameOrThrow<T extends string>(
  name: T | never
): name is T {
  if (!isValidName(name)) {
    throw new InvalidNameError(`${name}, ${VALID_NAME_EXP().source}`);
  }
  return true;
}

export function hasUpperCase(name: string) {
  return HAS_UPPER_CASE_EXP().test(name);
}

export function hasLowerCase(name: string) {
  return HAS_LOWER_CASE_EXP().test(name);
}

export function hasUnderScore(name: string) {
  return HAS_UNDER_SCORE_EXP().test(name);
}

export function hasDash(name: string) {
  return HAS_DASH_EXP().test(name);
}

export function hasUpperCaseAndLowerCase(name: string) {
  return [hasUpperCase, hasLowerCase]
    .map((f) => f(name))
    .every((v) => v == true);
}

export function upperCaseFirst(name: string) {
  return name[0].toUpperCase() + name.slice(1);
}

export function lowerCaseFirst(name: string) {
  return name[0].toLowerCase() + name.slice(1);
}

/**
 * Normalize the given {@link name} by transforming into lowercase and replace delimeters with a single space
 * @param name string
 * @returns normalized name in the lowercase and space seperated string
 */
export function normalizeName(name: string): string {
  name = trim(name);

  isValidNameOrThrow(name);

  if (hasUpperCaseAndLowerCase(name)) {
    name = name
      .split('')
      .map((v, i) => {
        if (i > 0) {
          if (/^[A-Z]$/.test(v)) {
            return '-' + v;
          }
        }
        return v;
      })
      .join('');
  }

  name = name.replace(/[\s-_]{1,}/g, ' ');

  name = name.toLowerCase();

  return name;
}
