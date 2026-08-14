import { Prisma } from '@beemood/pms-db/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProjectWhereDto implements Prisma.ProjectWhereInput {
  @ApiPropertyOptional() @IsString() name?: string;
}
