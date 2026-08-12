import { Max, Min, ValidationOptions } from 'class-validator';

export function Range(
  min: number,
  max: number,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    [Min(min, validationOptions), Max(max, validationOptions)].forEach(
      (decorator) => decorator(...args),
    );
  };
}
