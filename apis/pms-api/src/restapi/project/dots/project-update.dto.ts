import { PartialType } from '@nestjs/swagger';
import { ProjectCreateDto } from './project-create.dto.js';

export class ProjectUpdateDto extends PartialType(ProjectCreateDto) {}
