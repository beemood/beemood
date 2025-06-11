// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Prisma } from '@beemood/hr-prisma';
import {
  DateTimeFilterProperty,
  Dto,
  IntegerFilterProperty,
  StringFilterProperty,
} from '@bmod/property';
import { WhereHrArrayProperty } from '../decorator/where-hr-property.js';

@Dto()
export class WhereHrDto implements Prisma.HrWhereInput {
  @WhereHrArrayProperty() AND?: Prisma.HrWhereInput[];

  @WhereHrArrayProperty() OR?: Prisma.HrWhereInput[];

  @WhereHrArrayProperty() NOT?: Prisma.HrWhereInput[];

  @IntegerFilterProperty() id?: Prisma.IntFilter<'Hr'>;

  @DateTimeFilterProperty() createdAt?: Prisma.DateTimeFilter<'Hr'>;

  @DateTimeFilterProperty() updatedAt?: Prisma.DateTimeFilter<'Hr'>;

  @StringFilterProperty() name?: Prisma.StringFilter<'Hr'>;
}
