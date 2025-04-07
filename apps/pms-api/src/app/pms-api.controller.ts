/* eslint-disable @nx/enforce-module-boundaries */
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/pms';
import type { PmsApiDto } from './pms-api.dto.js';
import { PmsApiResponseDto } from './pms-api.response.js';

@Controller()
export class PmsApiController {
  constructor(@Inject(PrismaClient) protected readonly client: PrismaClient) {}

  @ApiOkResponse({ type: PmsApiResponseDto })
  @ApiOperation({ summary: 'Say pmsApi' })
  @Post('pmsApi')
  pmsApi(@Body() pmsApiDto: PmsApiDto) {
    return this.client.project.findMany();
  }
}
