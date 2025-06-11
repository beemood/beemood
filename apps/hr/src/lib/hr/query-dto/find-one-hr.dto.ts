// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { Dto } from '@bmod/property';
import { WhereHrProperty } from '../decorator/where-hr-property.js';
import { AdaptHrResponseDto } from './adapt-hr-response.dto.js';

@Dto()
export class FindOneHrDto
  extends AdaptHrResponseDto
  implements Prisma.HrFindUniqueArgs
{
  @WhereHrProperty() where: Prisma.HrWhereUniqueInput;
}
