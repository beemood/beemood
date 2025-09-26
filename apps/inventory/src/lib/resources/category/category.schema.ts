import { Prisma } from '@puq/inventory-db/client';
import {
  processJson,
  toBooleanRecord,
  toOrderRecord,
  toWhereRecord,
} from '@puq/zod';
import z from 'zod';

export const CategorySchema = z
  .object({ id: z.int(), name: z.string().min(3).max(30) })
  .partial();

export const CategoryCreateSchema = CategorySchema.pick({
  name: true,
}).required({ name: true });

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export const CategorySelectSchema = processJson(
  toBooleanRecord(CategorySchema)
);

export const CategoryOmitSchema = CategorySelectSchema;

export const CategoryOrderSchema = processJson(toOrderRecord(CategorySchema));

export const CategoryWhereSchema = processJson(toWhereRecord(CategorySchema));

export const CategoryProjectionSchema = z
  .object({
    select: CategorySelectSchema,
    omit: CategoryOmitSchema,
  })
  .partial();

export const CategoryPaginationSchema = z.object({
  take: z.coerce.number().int().min(1).default(3),
  skip: z.coerce.number().int().min(0).default(0),
});

export const CategoryQueryOneSchema = z.object({
  ...CategoryProjectionSchema.shape,
  where: CategoryWhereSchema,
});

export const CategoryQueryManySchema = z
  .object({
    ...CategoryPaginationSchema.shape,
    ...CategoryProjectionSchema.shape,
    where: CategoryWhereSchema,
    orderBy: CategoryOrderSchema,
  })
  .partial();

export const CategoryBySchema = z.object({
  property: z.enum(Prisma.CategoryScalarFieldEnum),
  value: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;
export type CategoryProjection = z.infer<typeof CategoryProjectionSchema>;
export type CategoryBy = z.infer<typeof CategoryBySchema>;
export type CategoryQueryMany = z.infer<typeof CategoryQueryManySchema>;
export type CategoryQueryOne = z.infer<typeof CategoryQueryOneSchema>;
