import { mustDefined } from '@beemood/errors';
import { ObjectType, PropOptions, PropTypes } from '@beemood/types';
import { setDefualtValue } from '@beemood/utils';
import { getPropType } from './get-prop-type.js';
export type NormalizedOptions = PropOptions & {
  __typeName: string;
  type: () => ObjectType;
};

/**
 * Infer the property type and check required type options.
 * @param options
 * @param args
 * @returns
 */
export function toNormalizedOptions(
  options: Readonly<PropOptions>,
  ...args: Parameters<PropertyDecorator>
): NormalizedOptions {
  const inferedType = getPropType(...args);
  const inferedTypeName = inferedType.name;
  const nOptions = setDefualtValue(
    {
      ...options,
      type: mustDefined<ObjectType>(),
      __typeName: inferedTypeName,
    },
    { required: false },
  );

  if (inferedTypeName === PropTypes.Array) {
    nOptions.isArray = true;
  } else {
    nOptions.type = () => inferedType;
  }

  return nOptions;
}
