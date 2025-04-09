/* eslint-disable @typescript-eslint/no-shadow */
import type { PropertyOptions } from '@bmod/types';

export function toApiPropertyOptions(options: PropertyOptions): any {
  const type = options.type;

  switch (type) {
    case 'string': {
      const {
        type,
        required,
        minLength,
        maxLength,
        description,
        isIn,
        isNotIn,
        defaultValue,
        example,
        examples,
      } = options;
      return {
        type,
        required: required === true,
        nullable: required !== true,
        description,
        minLength,
        maxLength,
        enum: isIn,
        not: {
          enum: isNotIn,
        },
        default: defaultValue,
        example,
        examples,
      };
    }
    case 'integer':
    case 'number': {
      const {
        type,
        required,
        minimum,
        maximum,
        description,
        isIn,
        isNotIn,
        defaultValue,
        example,
        examples,
      } = options;
      return {
        type,
        required: required === true,
        nullable: required !== true,
        description,
        minimum,
        maximum,
        enum: isIn,
        not: {
          enum: isNotIn,
        },
        default: defaultValue,
        example,
        examples,
      };
    }
    case 'boolean': {
      const { type, required, description, defaultValue, example, examples } =
        options;
      return {
        type,
        required: required === true,
        nullable: required !== true,
        description,
        default: defaultValue,
        example,
        examples,
      };
    }
    case 'object': {
      const { required, description, defaultValue, example, examples } =
        options;
      return {
        type: options.target(),
        required: required === true,
        nullable: required !== true,
        description,
        default: defaultValue,
        example,
        examples,
      };
    }
    case 'array': {
      const {
        type,
        required,
        minItems,
        maxItems,
        description,
        defaultValue,
        example,
        examples,
      } = options;
      return {
        type,
        required: required === true,
        nullable: required !== true,
        description,
        maxItems,
        minItems,
        items: toApiPropertyOptions(options.items as PropertyOptions) as any,
        default: defaultValue,
        example,
        examples,
      };
    }
  }
}
