import {
  PropValidation,
  type PropValidationOptions,
} from '@beemood/prop-validation';
import { Field } from '@nestjs/graphql';

/**
 * Graphql input field decorator
 *
 * @param options
 * @returns
 */
export function Prop(options: PropValidationOptions = {}): PropertyDecorator {
  return (...args) => {
    PropValidation(options)(...args);

    const type = options.type
      ? options.isArray
        ? () => [options.type?.()]
        : options.type
      : () => Reflect.getMetadata('design:type', ...args);

    Field(type, {
      nullable: options.required === true ? false : true,
      defaultValue: options.default,
    })(...args);
  };
}
