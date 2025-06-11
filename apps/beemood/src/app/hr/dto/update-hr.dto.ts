import { Dto } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import { CreateHrDto } from './create-hr.dto.js';

@Dto()
export class UpdateHrDto extends PartialType(CreateHrDto) {}
