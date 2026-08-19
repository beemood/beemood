import { transform, validate } from '@beemood/prop-validation';
import { extractAnnotations } from '@beemood/utils';
import { FieldAnnotationsDto } from './field-annotation.dto.js';
import { type Field } from './types.js';

export function extractFieldAnnotations(field: Field): FieldAnnotationsDto {
  const instance = transform(
    FieldAnnotationsDto,
    extractAnnotations(field.documentation ?? ''),
  );
  const errors = validate(instance);

  if (errors.length > 0) {
    throw new (class InvalidAnnotations {
      errors = errors;
    })();
  }

  return instance;
}
