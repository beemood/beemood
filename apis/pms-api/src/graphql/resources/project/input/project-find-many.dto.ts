import { InputType, Prop } from '@beemood/nestjs/graphql';

@InputType()
export class ProjectSelectDto {
  @Prop() id: boolean;
  @Prop() createdAt: boolean;
  @Prop() updatedAt: boolean;
  @Prop() deletedAt: boolean;
  @Prop() isActive: boolean;
  @Prop() name: boolean;
  @Prop() description: boolean;
  @Prop() startedAt: boolean;
  @Prop() endedAt: boolean;
  @Prop() dueAt: boolean;
  @Prop() sprints: boolean;
  @Prop() _count: boolean;
}

@InputType()
export class ProjectFindManyDto {
  @Prop({ maximum: 1000 }) take?: number;
  @Prop() skip?: number;
  @Prop({ type: () => ProjectSelectDto }) select?: ProjectSelectDto;
}
