import * as G from '@beemood/nestjs/graphql';
import { SprintListRelationFilterDto } from '../../sprint/input/sprint-where.dto.js';

@G.InputType()
export class ProjectWhereUnqiueDto {
  @G.Prop({ required: true }) name: string;
}

export class ProjectWhereDto {
  @G.Prop({ type: () => G.IntFilterDto }) id: G.IntFilterDto;
  @G.Prop({ type: () => G.DateFilterDto }) createdAt?: G.DateFilterDto;
  @G.Prop({ type: () => G.DateFilterDto }) updatedAt?: G.DateFilterDto;
  @G.Prop({ type: () => G.DateFilterDto }) deletedAt?: G.DateFilterDto;
  @G.Prop({ type: () => G.BooleanFilterDto }) isActive?: G.BooleanFilterDto;

  @G.Prop({ type: () => G.StringFilterDto }) name: G.StringFilterDto;
  @G.Prop({ type: () => G.StringFilterDto }) description?: G.StringFilterDto;
  @G.Prop({ type: () => G.DateFilterDto }) startedAt?: G.DateFilterDto;
  @G.Prop({ type: () => G.DateFilterDto }) endedAt?: G.DateFilterDto;
  @G.Prop({ type: () => G.DateFilterDto }) dueAt?: G.DateFilterDto;

  @G.Prop({ type: () => SprintListRelationFilterDto })
  sprints?: SprintListRelationFilterDto;

  @G.Prop({ type: () => ProjectWhereDto, isArray: true })
  NOT?: ProjectWhereDto[];

  @G.Prop({ type: () => ProjectWhereDto, isArray: true })
  AND?: ProjectWhereDto[];

  @G.Prop({ type: () => ProjectWhereDto, isArray: true })
  OR?: ProjectWhereDto[];
}

@G.InputType()
export class ProjectListRelationFilterDto {
  @G.Prop({ type: () => ProjectWhereDto }) some?: ProjectWhereDto;
  @G.Prop({ type: () => ProjectWhereDto }) every?: ProjectWhereDto;
  @G.Prop({ type: () => ProjectWhereDto }) none?: ProjectWhereDto;
}
