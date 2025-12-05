import z from 'zod';

export const NumberFilter = z.object({
  equal: z.number(),
});
