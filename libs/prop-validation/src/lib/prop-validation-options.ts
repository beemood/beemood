import { ApiPropertyOptions } from '@nestjs/swagger';
import * as CT from 'class-transformer';

export type DependencyValidationOptions = {
  moreThan?: string[];
  lessThan?: string[];
  equalTo?: string[];
  notEqualTo?: string[];
  isDefined?: string[];
  isNotDefined?: string[];
};

export type CustomPropValidationOptions = {
  __primitiveTypeName?: string;
  transformOptions?: CT.TransformOptions;
  dependencies?: DependencyValidationOptions;
  exlude?: boolean;
};

export type NormalizedPropValidationOptions = Omit<ApiPropertyOptions, 'type'> &
  CustomPropValidationOptions & {
    type?: <T>() => CT.ClassConstructor<T>;
  };

export type PropValidationOptions = Omit<
  NormalizedPropValidationOptions,
  '__primitiveTypeName'
>;
