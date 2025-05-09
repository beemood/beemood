/* eslint-disable @typescript-eslint/no-explicit-any */
export type CommonPropertyOptions<DefaultValue = any> = {
  name?: string;
  description?: string;
  required?: boolean;
  unique?: boolean;
  transform?: boolean;
  defaultValue?: DefaultValue;
  expose?: boolean;
};
