import { Transform } from 'class-transformer';

export function NumberTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        const tValue = parseFloat(value);

        if (isNaN(tValue)) {
          return value;
        }
        return tValue;
      }
      return value;
    })(...args);
  };
}
