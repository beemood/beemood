import type { PropertyType } from './property-type.js';

export type CommonOptions<T> = {
  type: PropertyType;
  required?: boolean;
  label?: string;
  description?: string;
  icon?: string;

  dependsOnProperties?: string[];
  notEqualToProperties?: string[];
  notWithProperties?: string[];

  readable?: boolean;
  writable?: boolean;
  update?: boolean;
  delete?: boolean;
  expose?: boolean;
  tags?: string[];

  //
  notEqual?: T;
  isIn?: T[];
  isNotIn?: T[];
  defaultValue?: T;
  transform?: boolean;

  examples?: T[];
  example?: T;

  format?: string;
};
