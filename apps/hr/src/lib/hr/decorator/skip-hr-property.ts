import { Property } from '@bmod/property';

export function SkipHrProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'integer',
      minimum: 0,
      defaultValue: 0,
      transform: true,
    })(...args);
  };
}
