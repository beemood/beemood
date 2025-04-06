import { Transform } from 'class-transformer';

export function BooleanTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (value === 'true') {
          return true;
        } else if (value == 'false') {
          return false;
        }
      }
      return value;
    })(...args);
  };
}
