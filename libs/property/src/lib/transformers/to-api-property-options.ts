/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropertyOptions } from '@bmod/types';
import type { ApiPropertyOptions } from '@nestjs/swagger';

/**
 * Convert {@link PropertyOptions} into swagger ApiPropertyOptions
 * @param options {@link PropertyOptions}
 * @returns ApiPropertyOptions
 */
export function toApiPropertyOptions(
  options: PropertyOptions
): ApiPropertyOptions {
  const { required: __required, defaultValue, description } = options;

  const required = __required == true;
  const nullable = __required != true;

  switch (options.type) {
    case 'string': {
      const { minLength, maxLength } = options;
      return {
        type: 'string',
        minLength,
        maxLength,
        required,
        default: defaultValue,
        nullable,

        description,
      };
    }
    case 'number': {
      const { minimum, maximum } = options;
      return {
        type: 'number',
        minimum,
        maximum,
        required,
        default: defaultValue,
        nullable,
        description,
      };
    }
    case 'integer': {
      const { minimum, maximum } = options;
      return {
        type: 'integer',
        minimum,
        maximum,
        required,
        default: defaultValue,
        nullable,
        description,
      };
    }
    case 'boolean': {
      return { type: 'boolean', required, default: defaultValue, nullable };
    }

    case 'object': {
      return {
        type: options.target,
        required,
        default: defaultValue,
        nullable,
        description,
      };
    }

    case 'array': {
      return {
        type: 'array',
        items: toApiPropertyOptions(options.items) as any,
        required,
        default: defaultValue,
        nullable,
        description,
      };
    }
    default:
      throw new Error('Invalid property type');
  }
}
