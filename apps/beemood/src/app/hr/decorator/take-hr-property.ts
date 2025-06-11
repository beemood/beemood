import { Property } from '@bmod/property';

export function TakeHrProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'integer',
      minimum: 1,
      defaultValue: 20,
      transform: true,
    })(...args);
  };
}
