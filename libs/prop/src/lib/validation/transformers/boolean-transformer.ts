import { Transform } from 'class-transformer';

export function BooleanTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (value === 'true') {
        return true;
      } else if (value === 'false') {
        return false;
      }
      return value;
    })(...args);
  };
}
