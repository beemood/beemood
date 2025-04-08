import { isDefined } from '@bmod/is';
import { Transform } from 'class-transformer';
import { isJSON } from 'class-validator';

export function ArrayTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (isJSON(value)) {
        value = JSON.parse(value);
      }

      if (isDefined(value)) {
        if (Array.isArray(value)) {
          return value;
        }
        return [value];
      }
      return value;
    })(...args);
  };
}
