import { InputType } from '@beemood/prop/graphql';
import { PartialType } from '@nestjs/graphql';
import { ProjectCreateDto } from './project-create.dto.js';

@InputType()
export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}
