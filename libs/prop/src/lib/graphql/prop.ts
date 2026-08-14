import { PropOptions } from '@beemood/types';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { __PropValidation } from '../validation/prop.js';
import {
  NormalizedOptions,
  toNormalizedOptions,
} from '../validation/to-normalized-options.js';
export { ArgsType, InputType, ObjectType } from '@nestjs/graphql';

export function __Prop(options: NormalizedOptions): PropertyDecorator {
  return (...args) => {
    __PropValidation(options)(...args);
  };
}

/**
 * Graphql property decorator
 * @param options
 * @returns
 */
export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    const nOptions = toNormalizedOptions(options, ...args);
    __Prop(nOptions)(...args);

    Field(nOptions.type, {
      nullable: nOptions.required !== true,
      defaultValue: nOptions.defaultValue,
    })(...args);
  };
}

export function InputDto(): ClassDecorator {
  return (...args) => {
    InputType()(...args);
    Exclude()(...args);
  };
}
export function Dto(): ClassDecorator {
  return (...args) => {
    ObjectType()(...args);
    Exclude()(...args);
  };
}
