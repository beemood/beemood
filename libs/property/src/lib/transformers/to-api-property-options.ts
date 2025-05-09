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
  const { type, required: __required, defaultValue, description } = options;

  // - [ ] add example fields
  const common: ApiPropertyOptions = {
    type,
    required: __required == true,
    nullable: __required != true,
    description,
    default: defaultValue,
  } as ApiPropertyOptions;

  switch (options.type) {
    case 'string': {
      const { minLength, maxLength, format } = options;
      return {
        minLength,
        maxLength,
        format,
        ...common,
      };
    }

    case 'integer':
    case 'number': {
      const { minimum, maximum } = options;
      return {
        ...common,
        minimum,
        maximum,
      };
    }
    case 'boolean': {
      return { ...common };
    }
    case 'object': {
      return {
        ...common,
        type: options.target(),
      } as ApiPropertyOptions;
    }

    case 'array': {
      return {
        ...common,
        items: toApiPropertyOptions(options.items) as any,
      };
    }
    default:
      throw new Error('Invalid property type');
  }
}
