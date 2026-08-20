import { type PropValidationOptions } from '@beemood/prop-validation';
import { type StringRecord } from '@beemood/types';
import { PropertyMatcher, toCode } from '@beemood/utils';
import { extractFieldAnnotations } from './extract-field-annotations.js';
import { toBoxType } from './to-type.js';
import { type Field } from './types.js';

export function parsePropertyValidationOptions(
  field: Field,
): StringRecord<PropValidationOptions> {
  const annotations = extractFieldAnnotations(field);

  const result: StringRecord<PropValidationOptions> = {};

  if (field.isRequired === true) {
    result.required = 'true';
  }

  if (field.isList) {
    result.isArray = 'true';
  }

  if (field.nativeType) {
    if (/^varchar$/i.test(field.nativeType[0])) {
      if (field.nativeType[1][0]) {
        result.maxLength = toCode(parseInt(field.nativeType[1][0]));
      }
    }
  }

  new PropertyMatcher(annotations)
    .isDefined('defaultValue', (value) => (result.default = toCode(value)))
    .isDefined('format', (value) => (result.format = toCode(value)))
    .isDefined('isIn', (value) => (result.isIn = toCode(value)))
    .isDefined('isNotIn', (value) => (result.isNotIn = toCode(value)))
    .isDefined('max', (value) => (result.maximum = toCode(value)))
    .isDefined('min', (value) => (result.minimum = toCode(value)))
    .isDefined('maxLength', (value) => (result.maxLength = toCode(value)))
    .isDefined('minLength', (value) => (result.minLength = toCode(value)))
    .isTrue('required', (value) => (result.required = toCode(value)))
    .isDefined('minItems', (value) => (result.minItems = toCode(value)))
    .isDefined('maxItems', (value) => (result.maxItems = toCode(value)))
    .isDefined('pattern', (value) => (result.pattern = toCode(value)))
    .collect();

  switch (field.kind) {
    case 'enum': {
      result.isIn = `${field.type}`;
      break;
    }
    case 'object': {
      result.type = `()=>${field.type}`;
      break;
    }
    case 'scalar': {
      if (field.type === 'Json' || field.type === 'Jsonb') {
        result.format = "'json'";
      } else if (field.isList) {
        result.type = `()=>${toBoxType(field)}`;
      }
      break;
    }
    case 'unsupported': {
      break;
    }
  }

  return result;
}
