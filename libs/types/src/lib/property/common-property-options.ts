/* eslint-disable @typescript-eslint/no-explicit-any */
export type CommonPropertyOptions<DefaultValue = any> = {
  name?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  transform?: boolean;
  defaultValue?: DefaultValue;
  expose?: boolean;
  isIn?: DefaultValue[];
  isNotIn?: DefaultValue[];
  notEqualToProperties?: string[];
  equalToProperty?: string;
  notWithProperties?: string;
  dependsOnProperties?: string[];
};
