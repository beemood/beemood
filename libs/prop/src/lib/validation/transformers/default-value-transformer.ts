import { Any } from '@beemood/types';
import { isNotDefined } from '@beemood/utils';
import { Transform } from 'class-transformer';

export function DefaultValueTransformer(defaultValue: Any): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (isNotDefined(value)) {
        if (typeof value === 'function') {
          return defaultValue();
        } else {
          return defaultValue;
        }
      }
      return value;
    })(...args);
  };
}
