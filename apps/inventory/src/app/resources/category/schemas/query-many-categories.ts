import { PositiveIntegerSchema } from '@beenest/nest';
import z from 'zod';
import {
  OmitCategoryFieldsSchema,
  SelectCategoryFieldsSchema,
} from './select-category-fields';
import { WhereCategorySchema } from './where-category';

export const QueryManyCategoriesSchema = z.object({
  take: PositiveIntegerSchema,
  skip: PositiveIntegerSchema,
  select: SelectCategoryFieldsSchema,
  omit: OmitCategoryFieldsSchema,
  where: WhereCategorySchema,
});

export type QueryManyCategories = z.infer<typeof QueryManyCategoriesSchema>;
