import { type ValidationError } from '@nestjs/common';
import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CLASS_TRANSFORM_OPTIONS } from './class-transform-options.js';

export function transformAndValidate<T extends object>(
  type: ClassConstructor<T>,
  value: T,
) {
  const instance = plainToInstance(type, value, {
    ...CLASS_TRANSFORM_OPTIONS,
  });

  const errors = validateSync(instance);

  const nErrors = errors
    .flatMap((e) => [...(e.children ?? []), e])
    .flat()
    .filter((e) => e) as ValidationError[];

  return {
    instance,
    errors: nErrors,
  };
}
