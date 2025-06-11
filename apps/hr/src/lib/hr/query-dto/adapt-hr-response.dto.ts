// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import { Dto } from '@bmod/property';
import { OmitHrProperty } from '../decorator/omit-hr-property.js';
import { SelectHrProperty } from '../decorator/select-hr-property.js';

@Dto()
export class AdaptHrResponseDto implements Prisma.HrFindManyArgs {
  @SelectHrProperty() select?: Prisma.HrSelect;
  @OmitHrProperty() omit?: Prisma.HrOmit;
}
