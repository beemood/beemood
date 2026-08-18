import { type RequiredProperties } from '@beemood/types';
import { type Type } from '@nestjs/common';

export type ModuleCommonOptions = {
  name?: string;
  profile?: string;
  models?: string[];
};

export type RootModuleOptions = {
  client: () => Type;
  features?: Type[];
} & ModuleCommonOptions;

export type FeatureModuleOptions = RequiredProperties<
  ModuleCommonOptions,
  'models'
>;
