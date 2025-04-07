import { ApiProperty } from '@nestjs/swagger';

export class PmsApiResponseDto {
  @ApiProperty({ type: 'string' })
  message: string;
}
