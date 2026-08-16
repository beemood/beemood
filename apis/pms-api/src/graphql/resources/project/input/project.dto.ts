import { Prisma } from '@beemood/pms-db/client';
import { ObjectType, Prop } from '@beemood/prop/graphql';

@ObjectType()
export class ProjectDto implements Partial<Prisma.ProjectModel> {
  @Prop() name?: string;
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() description?: string;
  @Prop() startedAt?: Date;
  @Prop() endedAt?: Date;
  @Prop() dueAt?: Date;
}
