import { Prisma } from '@beemood/pms-db/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, Min, ValidateNested } from 'class-validator';
import { ProjectWhereDto } from './project-where.dto.js';

export class ProjectFindManyDto implements Prisma.ProjectFindManyArgs {
  @ApiPropertyOptional() @IsPositive() take?: number;

  @ApiPropertyOptional() @Min(0) skip?: number;

  @ApiPropertyOptional()
  @Type(() => ProjectWhereDto)
  @ValidateNested()
  where: ProjectWhereDto;
}
