import { Casing } from '@beemood/types';
import { names } from '@beemood/utils';
import { Transform } from 'class-transformer';

export function CasingTransformer(casing: Casing): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        return names(value)[casing];
      } else if (Array.isArray(value)) {
        return value.map((v) => {
          if (typeof v === 'string') {
            return names(v)[casing];
          }
          return v;
        });
      }
      return value;
    })(...args);
  };
}
