import { type Prisma } from '@beemood/pms-db/client';
import { Prop } from '@beemood/prop/restapi';

export class ProjectCreateDto implements Prisma.ProjectUncheckedCreateInput {
  @Prop({ required: true }) name: string;
  @Prop() description?: string;
  @Prop() isActive?: boolean;
  @Prop() startedAt?: Date;
  @Prop() endedAt?: Date;
  @Prop() dueAt?: Date;
}
