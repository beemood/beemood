import * as G from '@beemood/nestjs/graphql';
import { type Prisma } from '@beemood/pms-db/client';

@G.InputType()
export class IntFilterDto {
  @G.Prop() equals?: number;
  @G.Prop() lt?: number;
  @G.Prop() lte?: number;
  @G.Prop() gt?: number;
  @G.Prop() gte?: number;
  @G.Prop({ type: () => Number, isArray: true }) in?: number[];
  @G.Prop({ type: () => Number, isArray: true }) notIn?: number[];
  @G.Prop({ type: () => IntFilterDto }) not: IntFilterDto;
}

@G.InputType()
export class DateFilterDto implements Required<Prisma.DateTimeFilter> {
  equals: string;
  lt: string;
  lte: string;
  gt: string;
  gte: string;
  in: string[];
  notIn: string[];
  not: DateFilterDto;
}

export class ProjectWhereDto implements Required<Prisma.ProjectWhereInput> {
  @G.Prop({ type: () => IntFilterDto }) id: IntFilterDto;

  createdAt: string | Date | Prisma.DateTimeFilter<'Project'>;
  updatedAt: string | Date | Prisma.DateTimeFilter<'Project'>;
  deletedAt: string | Date | Prisma.DateTimeNullableFilter<'Project'> | null;
  isActive: boolean | Prisma.BoolNullableFilter<'Project'> | null;
  name: string | Prisma.StringFilter<'Project'>;
  description: string | Prisma.StringNullableFilter<'Project'> | null;
  startedAt: string | Date | Prisma.DateTimeNullableFilter<'Project'> | null;
  endedAt: string | Date | Prisma.DateTimeNullableFilter<'Project'> | null;
  dueAt: string | Date | Prisma.DateTimeNullableFilter<'Project'> | null;

  sprints: Prisma.SprintListRelationFilter;

  NOT: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
  AND: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
  OR: Prisma.ProjectWhereInput[];
}
