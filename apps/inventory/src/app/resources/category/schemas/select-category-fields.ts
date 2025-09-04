import { createBooleanSchema } from '@beenest/nest';
import { z } from 'zod';
import { CategoryFields } from './category-fields';

export const SelectCategoryFieldsSchema = createBooleanSchema(CategoryFields);

export type SelectCategoryFields = z.infer<typeof SelectCategoryFieldsSchema>;

export const OmitCategoryFieldsSchema = SelectCategoryFieldsSchema.clone();

export type OmitCategoryFields = z.infer<typeof OmitCategoryFieldsSchema>;
