import { InputType, PartialType, PickType } from '@beemood/nestjs/graphql';
import { ProjectCreateDto } from './project-create.dto.js';

@InputType()
export class ProjectUpdateDto extends PartialType(
  PickType(ProjectCreateDto, ['name', 'description']),
) {}
