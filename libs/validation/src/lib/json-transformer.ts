import { Transform } from 'class-transformer';

export function JSONTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
      return value;
    })(...args);
  };
}
