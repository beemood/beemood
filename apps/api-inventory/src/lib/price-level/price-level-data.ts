import type { Prisma } from '@prisma/client';

export const priceLevelData: Prisma.PriceLevelUncheckedCreateInput[] = [
  { name: 'Wholesale', taxrate: 0 },
  { name: 'New York', taxrate: 8.875 },
  { name: 'Los Angeles', taxrate: 9.5 },
  { name: 'Chicago', taxrate: 10.25 },
  { name: 'Houston', taxrate: 8.25 },
  { name: 'Phoenix', taxrate: 8.6 },
  { name: 'Philadelphia', taxrate: 8 },
  { name: 'San Antonio', taxrate: 8.25 },
  { name: 'San Diego', taxrate: 7.75 },
  { name: 'Dallas', taxrate: 8.25 },
  { name: 'San Jose', taxrate: 9.375 },
  { name: 'San Francisco', taxrate: 8.625 },
];
