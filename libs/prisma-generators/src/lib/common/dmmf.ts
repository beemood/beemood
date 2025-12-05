import type { DMMF } from '@prisma/generator-helper';

export type Datamodel = Omit<DMMF.Datamodel, 'indexes'>;
export type Model = DMMF.Model;
export type Field = DMMF.Field;
export type EnumModel = DMMF.DatamodelEnum;
export type EnumField = DMMF.EnumValue;
