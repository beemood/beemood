import type { DMMF } from '@prisma/client/runtime/client.js';

export type Datamodel = Omit<DMMF.Datamodel, 'indexes'>;
export type Model = DMMF.Model;
export type Field = DMMF.Field;
