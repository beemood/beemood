import type { Prisma } from '@beemood/hr-prisma';
import {
  DateTimeFilterProperty,
  Dto,
  IntegerFilterProperty,
  Property,
  StringFilterProperty,
} from '@bmod/property';

@Dto()
export class WhereHrDto implements Prisma.HrWhereInput {
  @Property({
    type: 'array',
    items: {
      type: 'object',
      target: () => WhereHrDto,
    },
    transform: true,
  })
  AND?: Prisma.HrWhereInput[];

  @Property({
    type: 'array',
    items: {
      type: 'object',
      target: () => WhereHrDto,
    },
    transform: true,
  })
  OR?: Prisma.HrWhereInput[];

  @Property({
    type: 'array',
    items: {
      type: 'object',
      target: () => WhereHrDto,
    },
    transform: true,
  })
  NOT?: Prisma.HrWhereInput[];

  @IntegerFilterProperty() id?: Prisma.IntFilter<'Hr'>;

  @DateTimeFilterProperty() createdAt?: Prisma.DateTimeFilter<'Hr'>;

  @DateTimeFilterProperty() updatedAt?: Prisma.DateTimeFilter<'Hr'>;

  @StringFilterProperty() name?: Prisma.StringFilter<'Hr'>;
}
