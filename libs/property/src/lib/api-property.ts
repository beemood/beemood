import type { PropertyOptions } from '@beemood/interface';
import {
    type ApiPropertyOptions,
    ApiProperty as __ApiProperty,
} from '@nestjs/swagger';
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface.js';

export function toApiPropertyOptions(
  options: PropertyOptions
): ApiPropertyOptions {
  const { type } = options;

  const commonOptions: ApiPropertyOptions = {
    default: options.defaultValue,
    example: options.example,
    examples: options.examples,
    description: options.description,
    required: options.required == true,
    nullable: options.required != true,
  };

  switch (type) {
    case 'string': {
      const { minLength, maxLength, isIn } = options;

      return {
        ...commonOptions,
        type: 'string',
        enum: isIn,
        minLength,
        maxLength,
        not: { enum: isIn },
      };
    }
    case 'number': {
      const { minimum, maximum } = options;
      return { ...commonOptions, type: 'number', minimum, maximum };
    }
    case 'integer': {
      const { minimum, maximum } = options;
      return { ...commonOptions, type: 'integer', minimum, maximum };
    }
    case 'boolean': {
      return { ...commonOptions, type: 'boolean' };
    }
    case 'object': {
      return { ...commonOptions, type: options.target() };
    }
    case 'date': {
      return { ...commonOptions, type: 'string', format: 'date' };
    }
    case 'array': {
      return {
        type: 'array',
        items: toApiPropertyOptions(options.items) as SchemaObject,
      };
    }
  }
}
export function ApiProperty(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    __ApiProperty(toApiPropertyOptions(options))(...args);
  };
}
