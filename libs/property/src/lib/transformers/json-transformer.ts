import { Transform } from 'class-transformer';
/**
 * Parse valid json string value
 * @returns PropertyDecorator
 */
export function JSONTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
      return value;
    })(...args);
  };
}
