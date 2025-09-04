import z from 'zod';
import { CategorySchema } from './category';

export const UpdateCategorySchema = CategorySchema.partial();

export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
