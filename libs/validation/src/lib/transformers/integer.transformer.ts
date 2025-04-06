import { Transform } from 'class-transformer';

export function IntegerTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        const tValue = parseInt(value);

        if (isNaN(tValue)) {
          return value;
        }
        return tValue;
      }
      return value;
    })(...args);
  };
}
