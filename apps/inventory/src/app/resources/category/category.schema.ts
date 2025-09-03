import { z } from 'zod';
import { createBooleanSchema } from '@beenest/nest';

export const CategorySchema = z
  .object({
    id: z.int().min(1),
    name: z.string().min(3).max(30),
  })
  .partial();

export type Category = z.infer<typeof CategorySchema>;

export const CreateCategorySchema = CategorySchema.pick({
  name: true,
}).required({ name: true });

export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = CreateCategorySchema.partial();

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

export const QueryManyCategorySchema = z.object({});

export type QueryManyCategory = z.infer<typeof QueryManyCategorySchema>;

export const SelectCategorySchema = createBooleanSchema(['id', 'name']);

export type SelectCategory = z.infer<typeof SelectCategorySchema>;

export const OmitCategorySchema = SelectCategorySchema.clone();

export type OmitCategory = z.infer<typeof OmitCategorySchema>;

export const QueryOneCategorySchema = z
  .object({
    select: z.object(),
    omit: z.object(),
    include: z.object(),
  })
  .partial();

export type QueryOneCategory = z.infer<typeof QueryOneCategorySchema>;
