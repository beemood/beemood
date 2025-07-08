import { ApiPropertyOptions } from '@nestjs/swagger';
import { PropertyOptions } from './property.js';

export function toApiPropertyOptions(
  options: PropertyOptions
): ApiPropertyOptions {
  const common: ApiPropertyOptions = {
    required: options.required === true ? true : false,
    nullable: options.required === true ? false : true,
  };
  switch (options.type) {
    case 'string': {
      return {};
    }
    case 'number': {
      return {};
    }
    case 'boolean': {
      return {};
    }
    case 'object': {
      return {};
    }
    case 'integer': {
      return {};
    }
    case 'array': {
      return {};
    }
  }
}
