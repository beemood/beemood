import z from 'zod';

export const StringFilter = z.object({
  equal: z.string(),
});
