import {
  PropValidation,
  PropValidationOptions,
} from '@beemood/prop-validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { toApiProperyOptions } from './to-api-property-options.js';

/**
 * Rest api dto property decorator
 *
 * @param options
 * @returns
 */
export function Prop(options: PropValidationOptions = {}): PropertyDecorator {
  return (...args) => {
    const { required } = options;

    const isRequried = required == true;

    PropValidation(options)(...args);

    const apiPropertyOptions = toApiProperyOptions(options);

    if (isRequried) {
      ApiProperty(apiPropertyOptions)(...args);
    } else {
      ApiPropertyOptional(apiPropertyOptions)(...args);
    }
  };
}
