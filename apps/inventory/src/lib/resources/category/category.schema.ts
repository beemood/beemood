import { toBooleanRecord, toOrderRecord } from '@puq/zod';
import z from 'zod';

export const CategorySchema = z.object({
  id: z.int(),
  name: z.string(),
});

export const CreateCategorySchema = CategorySchema.pick({
  name: true,
}).required({ name: true });

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const SelectCategorySchema = toBooleanRecord(CategorySchema);

export const OmitCategorySchema = SelectCategorySchema;

export const OrderCategorySchema = toOrderRecord(CategorySchema);

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
