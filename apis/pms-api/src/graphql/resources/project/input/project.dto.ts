import * as G from '@beemood/nestjs/graphql';

@G.ObjectType()
export class ProjectDto {
  @G.Prop() name?: string;
  @G.Prop() id?: number;
  @G.Prop() createdAt?: Date;
  @G.Prop() updatedAt?: Date;
  @G.Prop() deletedAt?: Date;
  @G.Prop() isActive?: boolean;
  @G.Prop() description?: string;
  @G.Prop() startedAt?: Date;
  @G.Prop() endedAt?: Date;
  @G.Prop() dueAt?: Date;
}
