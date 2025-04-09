import { RestBuilder } from '@bmod/rest';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { QueryProjectDto } from './dto/query-project.dto.js';
import { ReadProjectDto } from './dto/read-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

export const ProjectRest = new RestBuilder({
  resourceName: 'project',
  dto: ReadProjectDto,
  createDto: CreateProjectDto,
  updateDto: UpdateProjectDto,
  queryDto: QueryProjectDto,
});
