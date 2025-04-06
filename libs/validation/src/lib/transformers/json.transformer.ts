import { Transform } from 'class-transformer';

export function JSONTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch (err) {
          //
        }
      }
      return value;
    })(...args);
  };
}
