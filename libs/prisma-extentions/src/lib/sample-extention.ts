import { Prisma } from '@prisma/client/extension';
import { Datamodel } from './helpers.js';

export function sampleExtention(datamodel: Datamodel) {
  return Prisma.defineExtension((client) => {
    return client.$extends({
      name: 'SoftDelete',

      query: {
        Sample: {
          findMany({ args, query }) {
            return query(args);
          },
        },
      },
    });
  });
}
