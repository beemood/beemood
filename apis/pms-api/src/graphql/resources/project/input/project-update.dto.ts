import * as G from '@beemood/nestjs/graphql';
import { ProjectCreateDto } from './project-create.dto.js';

@G.InputType()
export class ProjectUpdateDto extends G.PartialType(
  G.PickType(ProjectCreateDto, ['name', 'description']),
) {}
