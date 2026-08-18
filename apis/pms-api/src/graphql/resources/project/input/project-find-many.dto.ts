import * as G from '@beemood/nestjs/graphql';
import { ProjectWhereDto, ProjectWhereUnqiueDto } from './project-where.dto.js';

@G.InputType()
export class ProjectFindManyDto {
  @G.Prop({ type: () => ProjectWhereUnqiueDto, default: {} })
  cursor?: ProjectWhereUnqiueDto;
  @G.Prop({ maximum: 1000 }) take?: number;
  @G.Prop() skip?: number;
  @G.Prop({ type: () => ProjectWhereDto }) where?: ProjectWhereDto;
}
