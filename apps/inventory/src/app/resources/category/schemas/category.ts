import z from 'zod';

export const CategoryObject = {
  id: z.int(),
  name: z.string().min(3).max(30),
};

export const CategorySchema = z.object(CategoryObject);

export type Category = z.infer<typeof CategorySchema>;
