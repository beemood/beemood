import { type PropValidationOptions } from '@beemood/prop-validation';
import { extractAnnotations, isDefined, toCode } from '@beemood/utils';
import { isRequiredField } from '../../common/is-required-field.js';
import { type Field } from '../../common/types.js';

export function printDtoPropertyDecoratorOptions(
  field: Field,
  explicitlyRequired?: boolean,
): string {
  const propOptions = extractAnnotations(
    field.documentation ?? '',
  ) as Partial<PropValidationOptions>;

  // Configure the required option

  if (isDefined(explicitlyRequired) || isDefined(propOptions.required)) {
    propOptions.required = explicitlyRequired ?? propOptions.required ?? false;
  } else if (isRequiredField(field)) {
    propOptions.required = true;
  }

  if (field.isList) {
    propOptions.isArray = true;
  }

  if (field.isList || propOptions.required === false) {
    delete propOptions.required;
  }

  switch (field.name) {
    case 'email': {
      propOptions.format = 'email';
      break;
    }
    case 'url': {
      propOptions.format = 'url';
      break;
    }
    case 'uuid': {
      propOptions.format = 'uuid7';
      break;
    }
  }

  if (field.nativeType?.[0])
    switch (field.nativeType[0]) {
      case 'Uuid': {
        propOptions.format = 'uuid7';
        break;
      }
      case 'Text': {
        propOptions.maxLength = 1000;
        break;
      }
      case 'VarChar': {
        if (field.nativeType[1][0]) {
          propOptions.maxLength = parseInt(field.nativeType[1][0]);
        }
      }
    }

  if (field.kind === 'scalar') {
    if (field.type === 'Json') {
      propOptions.format = 'json';
    }
  }

  return toCode(propOptions);
}
