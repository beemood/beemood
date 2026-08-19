import { type ValidationError } from '@nestjs/common';
import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, type ValidatorOptions } from 'class-validator';
import 'reflect-metadata';
import { CLASS_TRANSFORM_OPTIONS } from './class-transform-options.js';

export function transform<T>(type: ClassConstructor<T>, value: T): T {
  return plainToInstance(type, value, { ...CLASS_TRANSFORM_OPTIONS });
}

export function validate<T extends object>(
  value: T,
  options?: ValidatorOptions,
): ValidationError[] {
  return validateSync(value, options);
}

export function transformAndValidate<T extends object>(
  type: ClassConstructor<T>,
  value: T,
) {
  const instance = transform(type, value);

  const errors = validate(instance, {});

  const flatErrors = errors
    .flatMap((e) => [...(e.children ?? []), e])
    .flat()
    .filter((e) => e) as ValidationError[];

  return {
    instance,
    errors: flatErrors,
  };
}
