import { type ApiPropertyOptions } from '@nestjs/swagger';
import type * as CT from 'class-transformer';

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
    type?: () => CT.ClassConstructor<any>;
  };

export type PropValidationOptions = Omit<
  NormalizedPropValidationOptions,
  '__primitiveTypeName'
>;
