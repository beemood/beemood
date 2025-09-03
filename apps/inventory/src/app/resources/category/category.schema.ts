import { z } from 'zod';

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
