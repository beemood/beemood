import { DMMF } from '@prisma/generator-helper';

export type ScalarFieldType =
  | 'BigInt'
  | 'Boolean'
  | 'Bytes'
  | 'DateTime'
  | 'Decimal'
  | 'Float'
  | 'Int'
  | 'JSON'
  | 'String';
export type Model = DMMF.Model;
export type Field = DMMF.Field;
export type Datamodel = DMMF.Datamodel;
export type DatamodelEnum = DMMF.DatamodelEnum;
export type FieldRefType = DMMF.FieldRefType;
export type FieldDefault = DMMF.FieldDefault;
export type EnumValue = DMMF.EnumValue;

export const CommonDtoClassNames = {
  NumberFilterDto: 'NumberFilterDto',
  StringFilterDto: 'StringFilterDto',
  DateFilterDto: 'DateFilterDto',
  BooleanFilterDto: 'BooleanFilterDto',
} as const;
