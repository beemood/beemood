import { Transform } from 'class-transformer';

export function TrimTransformer<T>(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return value.replace(/s{2,}/g, ' ').trim();
      }
      return value;
    })(...args);
  };
}
