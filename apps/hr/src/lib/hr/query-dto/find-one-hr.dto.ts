import type { Prisma } from '@beemood/hr-prisma';
import { Dto, Property } from '@bmod/property';
import { AdaptHrResponseDto } from './adapt-hr-response.dto.js';
import { WhereHrDto } from './where-hr.dto.js';

@Dto()
export class FindOneHrDto
  extends AdaptHrResponseDto
  implements Prisma.HrFindUniqueArgs
{
  @Property({
    type: 'object',
    target: () => WhereHrDto,
    transform: true,
  })
  where: Prisma.HrWhereUniqueInput;
}
