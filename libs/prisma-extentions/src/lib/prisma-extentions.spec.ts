import { prismaExtentions } from './prisma-extentions.js';

describe('prismaExtentions', () => {
  it('should work', () => {
    expect(prismaExtentions()).toEqual('prisma-extentions');
  });
});
