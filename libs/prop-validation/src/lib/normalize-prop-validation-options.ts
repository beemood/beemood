import { isBoxedTypeConstructor, UnkownTypeError } from '@beemood/utils';
import { isDefined } from 'class-validator';
import {
  type NormalizedPropValidationOptions,
  type PropValidationOptions,
} from './prop-validation-options.js';

export function normalizePropValidationOptions(
  propValidationOptions: PropValidationOptions,
  ...args: Parameters<PropertyDecorator>
): NormalizedPropValidationOptions {
  const o: NormalizedPropValidationOptions = { ...propValidationOptions };

  // If options.type is undefined
  if (o.type === undefined) {
    // Then get the type from reflection
    const inferedType = Reflect.getMetadata('design:type', args[0], args[1]);

    if (
      !isDefined(propValidationOptions.isIn) &&
      !isBoxedTypeConstructor(inferedType)
    ) {
      throw new UnkownTypeError(
        [
          `if property type is not defined, the property type must be a ts box type or an enum ( which must be pvovided through enum property).`,
          `But, ${args[0].constructor.name}.${args[0].toString()} does not have a valid property options! `,
          `Optoins: ${JSON.stringify(propValidationOptions)}`,
        ].join('\n'),
      );
    }

    o.__primitiveTypeName ??= inferedType.name;
  } else {
    // Type must be function
    if (typeof o.type !== 'function') {
      throw new Error('type must be a function');
    }
  }

  return o;
}
