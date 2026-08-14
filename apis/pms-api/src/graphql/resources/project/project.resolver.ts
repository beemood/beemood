import { Prisma } from '@beemood/pms-db/client';
import { InjectDelegate } from '@beemood/prisma';

export class ProjectResolver {
  constructor(
    @InjectDelegate() protected readonly delegate: Prisma.ProjectDelegate,
  ) {}
}
