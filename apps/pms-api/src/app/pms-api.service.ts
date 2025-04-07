import { Injectable } from '@nestjs/common';
import type { PmsApiDto } from './pms-api.dto.js';

@Injectable()
export class PmsApiService {
  pmsApi(pmsApiDto: PmsApiDto) {
    return { message: `PmsApi, ${pmsApiDto.name}` };
  }
}
