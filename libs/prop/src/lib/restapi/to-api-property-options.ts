import { PropValidationOptions } from '@beemood/prop-validation';
import { ApiPropertyOptions } from '@nestjs/swagger';

export function toApiProperyOptions(
  options: PropValidationOptions,
): ApiPropertyOptions {
  const { type, required } = options;

  return {
    ...options,
    type,
    required: required === true,
  } as ApiPropertyOptions;
}
