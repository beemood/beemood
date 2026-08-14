import {
    NormalizedPropValidationOptions,
    PropValidationOptions,
} from './prop-validation-options.js';

export function normalizePropValidationOptions(
  propValidationOptions: PropValidationOptions,
  ...args: Parameters<PropertyDecorator>
): NormalizedPropValidationOptions {
  const o: NormalizedPropValidationOptions = { ...propValidationOptions };

  // If options.type is undefined
  if (o.type == undefined) {
    // Then get the type from reflection
    const inferedType = Reflect.getMetadata('design:type', args[0], args[1]);

    const primitiveTypes = new Set([String, Number, Boolean, Date, Buffer]);

    // If the infered type is not one of the allowed primitive types,
    // then throw error.
    if (!primitiveTypes.has(inferedType)) {
      throw new Error(
        `Unkown type, ${inferedType.name}, must be provided in options.type.`,
      );
    }
    o.__primitiveTypeName = inferedType.name;
  } else {
    // Type must be function
    if (typeof o.type != 'function') {
      throw new Error('type must be a function');
    }
  }

  return o;
}
