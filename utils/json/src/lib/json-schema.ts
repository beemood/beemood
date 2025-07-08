export type SchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'object'
  | 'array'
  | 'boolean';

export type JsonSchema = {
  $id?: string;
  $ref?: string;
  additionalItems?: boolean;
  additionalProperties?: boolean;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  const?: any;
  contains?: JsonSchema;
  contentMediaType?: string;
  default?: any;
  definitions?: Record<string, JsonSchema>;
  dependencies?: Record<string, boolean>;
  description?: string;
  else?: JsonSchema;
  enum?: any[];
  examples?: any[];
  exclusiveMaximum?: 0;
  exclusiveMinimum?: 0;
  format?: string;
  if?: JsonSchema;
  items?: JsonSchema;
  maximum?: 0;
  maxItems?: 0;
  maxLength?: 0;
  maxProperties?: 0;
  minimum?: 0;
  minItems?: 1;
  minLength?: 1;
  minProperties?: 1;
  multipleOf?: 1;
  not?: JsonSchema;
  oneOf?: JsonSchema[];
  pattern?: string;
  patternProperties?: Record<string, JsonSchema>;
  properties?: Record<string, JsonSchema>;
  propertyNames?: JsonSchema;
  readOnly?: boolean;
  required?: string[];
  then?: JsonSchema;
  title?: string;
  type?: SchemaType;
  uniqueItems?: boolean;
  contentEncoding?: string;
  $schema?: string;
  $comment?: string;
};
