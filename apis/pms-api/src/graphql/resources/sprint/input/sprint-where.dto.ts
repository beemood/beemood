import * as G from '@beemood/nestjs/graphql';

@G.InputType()
export class SprintWhereDto {}

@G.InputType()
export class SprintListRelationFilterDto {
  @G.Prop({ type: () => SprintWhereDto }) some: SprintWhereDto;
  @G.Prop({ type: () => SprintWhereDto }) every: SprintWhereDto;
  @G.Prop({ type: () => SprintWhereDto }) none: SprintWhereDto;
}
