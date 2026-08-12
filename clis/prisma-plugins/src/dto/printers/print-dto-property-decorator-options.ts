import {
  Any,
  DateFactory,
  ObjectType,
  PropFormat,
  PropOptions,
  PropValidationOptions,
  ToAnyRecord,
} from '@beemood/types';
import {
  codifyObject,
  extractAnnotations,
  isDefined,
  toInstance,
} from '@beemood/utils';
import { isRequiredField } from '../../common/is-required-field.js';
import { Field } from '../../common/types.js';

class PropOptionsClass implements Required<PropOptions> {
  type(): ObjectType {
    throw new Error('Method not implemented.');
  }
  computed: (value: Any) => Any;
  defaultValue: any;
  isArray: boolean;
  groups: string[];
  exclude: boolean;
  required: boolean;
  format: PropFormat;
  equalsTo: string | number | DateFactory;
  moreThan: string | number | DateFactory;
  lessThan: string | number | DateFactory;
  moreThanOrEqualTo: string | number | DateFactory;
  lessThanOrEqualTo: string | number | DateFactory;
  isIn: (string | number)[];
  dependencies: ToAnyRecord<any>;
  not: PropValidationOptions;
}

export function printDtoPropertyDecoratorOptions(
  field: Field,
  explicitlyRequired?: boolean,
): string {
  const annotations = extractAnnotations(field.documentation ?? '');

  const propOptions = toInstance<Partial<PropOptionsClass>>(
    PropOptionsClass,
    annotations,
  );

  delete propOptions.type;

  // Configure the required option

  if (isDefined(explicitlyRequired) || isDefined(propOptions.required)) {
    propOptions.required = explicitlyRequired ?? propOptions.required;
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
        propOptions.lessThanOrEqualTo = '1000';
        break;
      }
      case 'VarChar': {
        if (field.nativeType[1][0]) {
          propOptions.lessThanOrEqualTo = `${parseInt(field.nativeType[1][0])}`;
        }
      }
    }

  if (field.kind == 'scalar') {
    if (field.type === 'Json') {
      propOptions.format = 'json';
    }
  }

  return codifyObject(propOptions);
}
