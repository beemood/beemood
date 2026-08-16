import {
  PropValidation,
  PropValidationOptions,
} from '@beemood/prop-validation';
import { Field } from '@nestjs/graphql';

export { ArgsType, InputType, ObjectType } from '@nestjs/graphql';

/**
 * Graphql input field decorator
 *
 * @param options
 * @returns
 */
export function Prop(options: PropValidationOptions = {}): PropertyDecorator {
  return (...args) => {
    PropValidation(options)(...args);
    Field(() => Reflect.getMetadata('design:type', args[0], args[1]) as any, {
      nullable: options.required === true ? false : true,
      defaultValue: options.default,
    })(...args);
  };
}
