import {
  Any,
  DateFactory,
  ObjectType,
  PropFormat,
  PropOptions,
  PropValidationOptions,
  ToAnyRecord,
} from '@beemood/types';
import { toInstance } from '@beemood/utils';

export class PropOptionsClass implements Required<PropOptions> {
  defaultValue: Any;
  computed: (value: Any) => Any;
  type: () => ObjectType;
  isArray: boolean;
  dependencies: ToAnyRecord<any>;
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
  not: PropValidationOptions;
}

export function normalizeDtoPropertyOptions(
  options: Record<string, Any>,
  isRequiredField = false,
) {
  if (isRequiredField) {
    if (options.required !== false) {
      options.required = true;
    }
  }

  return toInstance(PropOptionsClass, options);
}
