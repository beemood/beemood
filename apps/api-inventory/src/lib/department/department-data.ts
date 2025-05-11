import { departmentCategoryList } from './department-data-raw.js';

export const departmentData = departmentCategoryList.map((e) => {
  return { name: e.name };
});
