import { ObjectType } from '@beemood/types';
import { Transform } from 'class-transformer';
import { isDefined } from 'class-validator';

export function __InstanceTransformer(type: ObjectType): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (isDefined(value)) {
        if (Array.isArray(value)) {
          return value.map((e) => new type(e));
        } else {
          return new type(value);
        }
      }
      return value;
    })(...args);
  };
}
