import { Transform } from 'class-transformer';

/**
 * Trim and replace all double spaces with single one
 * @returns PropertyDecorator
 */
export function TrimTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return value.trim().replace(/\s{1,}/g, ' ');
      }
      return value;
    })(...args);
  };
}
