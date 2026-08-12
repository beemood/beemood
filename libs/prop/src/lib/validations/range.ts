import { ValidationOptions, Min, Max } from "class-validator";

export function __RangeValidation(
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
