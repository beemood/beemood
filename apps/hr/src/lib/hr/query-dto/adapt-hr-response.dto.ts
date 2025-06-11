import type { Prisma } from '@beemood/hr-prisma';
import { Dto, Property } from '@bmod/property';
import { OmitHrDto } from './omit-hr.dto.js';
import { SelectHrDto } from './select-hr.dto.js';

@Dto()
export class AdaptHrResponseDto implements Prisma.HrFindManyArgs {
  @Property({
    type: 'object',
    target: () => SelectHrDto,
    transform: true,
  })
  select?: Prisma.HrSelect;

  @Property({
    type: 'object',
    target: () => OmitHrDto,
    transform: true,
  })
  omit?: Prisma.HrOmit;
}
