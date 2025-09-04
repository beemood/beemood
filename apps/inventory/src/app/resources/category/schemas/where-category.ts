import { IntegerFilterSchema, StringFilterSchema } from '@beenest/nest';
import { parseJsonOrParam } from '@beenest/utils';
import z from 'zod';

export const WhereCategorySchema = z.preprocess(
  parseJsonOrParam,
  z
    .object({
      id: IntegerFilterSchema,
      name: StringFilterSchema,
    })
    .partial()
    .optional()
);
