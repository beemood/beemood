/* eslint-disable @typescript-eslint/no-wrapper-object-types */
export interface PositiveNumber extends Number {
  readonly _brand: 'PositiveNumber';
}

export function isPositiveNumber(
  value: number | PositiveNumber
): value is PositiveNumber {
  if (new Number(value).valueOf() > 0) {
    return true;
  }

  return false;
}

export function positiveNumber(value: number): PositiveNumber {
  if (!isPositiveNumber(value)) {
    throw new Error('Invalid value : ${value}');
  }
  return value;
}
