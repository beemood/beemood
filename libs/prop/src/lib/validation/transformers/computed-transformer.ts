import { Any } from '@beemood/types';
import { Transform, TransformFnParams } from 'class-transformer';

export function ComputedTransformer(
  handler: (params: TransformFnParams) => Any,
): PropertyDecorator {
  return (...args) => {
    Transform((params) => {
      return handler(params);
    })(...args);
  };
}
