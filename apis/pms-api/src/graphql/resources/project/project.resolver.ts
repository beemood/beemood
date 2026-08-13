import { ProjectReadDto } from '@beemood/pms-db/graphql';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ProjectResolver {
  @Query(() => ProjectReadDto, {
    name: 'findManyProject',
    description: 'Find many projects',
  })
  findMany() {
    return;
  }
}
