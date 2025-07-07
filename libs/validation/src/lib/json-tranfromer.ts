import { Transform } from 'class-transformer';

export function JsonTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
      return value;
    })(...args);
  };
}
