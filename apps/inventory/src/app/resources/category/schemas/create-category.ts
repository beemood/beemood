import z from 'zod';
import { CategorySchema } from './category';

export const CreateCategorySchema = CategorySchema.pick({
  name: true,
}).required({ name: true });

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
