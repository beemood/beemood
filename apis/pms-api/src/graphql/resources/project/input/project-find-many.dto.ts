import * as G from '@beemood/nestjs/graphql';

@G.InputType()
export class ProjectWhereDto {
  @G.Prop() name?: string;
  @G.Prop() description?: string;
}

@G.InputType()
export class ProjectFindManyDto {
  @G.Prop({ maximum: 1000 }) take?: number;
  @G.Prop() skip?: number;
  @G.Prop({ type: () => ProjectWhereDto }) where?: ProjectWhereDto;
}
