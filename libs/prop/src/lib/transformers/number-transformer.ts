import { Transform } from 'class-transformer';

export type NumberOptions = {};

export function NumberTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return Number(value);
      }
      return value;
    })(...args);
  };
}
