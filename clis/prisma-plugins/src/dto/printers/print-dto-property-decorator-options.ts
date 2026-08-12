import { PropOptions, ToStringRecord } from '@beemood/types';
import { extractAnnotations, isDefined, toInstance } from '@beemood/utils';
import { getTsPrimiteWrapperType } from '../../common/get-ts-property-type.js';
import { isReadonlyField } from '../../common/is-readonly-field.js';
import { Field } from '../../common/types.js';

class PropOptionsClass implements ToStringRecord<PropOptions> {
  type: string;
  format: string;
  computed: string;
  defaultValue: string;
  isArray: string;
  groups: string;
  exclude: string;
  required: string;
  equalsTo: string;
  moreThan: string;
  lessThan: string;
  moreThanOrEqualTo: string;
  lessThanOrEqualTo: string;
  isIn: string;
  dependencies: string;
  not: string;
}

export function printDtoPropertyDecoratorOptions(
  field: Field,
  explicitlyRequired?: boolean,
): string {
  const annotations = extractAnnotations(field.documentation ?? '');
  const instance = toInstance<Partial<PropOptionsClass>>(
    PropOptionsClass,
    annotations,
  );

  if (isDefined(explicitlyRequired)) {
    instance.required = `${explicitlyRequired}`;
  } else {
    instance.required ??= `${isReadonlyField(field)}`;
  }

  if (instance.required === 'false') {
    delete instance.required;
  }

  if (field.isList) {
    instance.isArray = 'true';
    delete instance.required;
    instance.type = `()=>${getTsPrimiteWrapperType(field)}`;
  }

  switch (field.name) {
    case 'email': {
      instance.format = "'email'";
      break;
    }
    case 'url': {
      instance.format = "'url'";
      break;
    }
    case 'uuid': {
      instance.format = "'uuid7'";
      break;
    }
  }

  if (field.nativeType?.[0])
    switch (field.nativeType[0]) {
      case 'Uuid': {
        instance.format = "'uuid7'";
        break;
      }
      case 'Text': {
        instance.lessThanOrEqualTo = '1000';
        break;
      }
      case 'VarChar': {
        if (field.nativeType[1][0]) {
          instance.lessThanOrEqualTo = `${parseInt(field.nativeType[1][0])}`;
        }
      }
    }

  if (field.kind == 'scalar') {
    if (field.type === 'Json') {
      instance.format = "'json'";
    }
  }

  const acc = new Set<string>();

  const entries = Object.entries(instance);

  for (const [key, value] of entries) {
    acc.add(`${key}: ${value}`);
  }

  const preContent = [...acc].join(',').trim();

  if (preContent === '') {
    return '';
  }
  return `{${preContent}}`;
}
