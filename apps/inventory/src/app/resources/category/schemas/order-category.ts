import { createOrderBySchema } from '@beenest/nest';
import z from 'zod';
import { CategoryFields } from './category-fields';

export const OrderCategorySchema = createOrderBySchema(CategoryFields);

export type OrderCategory = z.infer<typeof OrderCategorySchema>;
