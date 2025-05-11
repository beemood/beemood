import type { Prisma } from '@prisma/client';
import { departmentCategoryList } from '../department/department-data-raw.js';

export const categoryData: Prisma.CategoryUncheckedCreateInput[] =
  departmentCategoryList
    .map((e) => {
      return e.subcategories;
    })
    .flat();
