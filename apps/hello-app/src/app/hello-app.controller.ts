/* eslint-disable @nx/enforce-module-boundaries */
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/hello';
import { HelloDto } from './hello-app.dto.js';
import { HelloResponseDto } from './hello-app.response.js';

@Controller()
export class HelloAppController {
  constructor(@Inject(PrismaClient) protected readonly prisma: PrismaClient) {}

  @ApiOkResponse({ type: HelloResponseDto })
  @ApiOperation({ summary: 'Say hello' })
  @ApiBody({ type: HelloDto })
  @Post('hello')
  hello(@Body() helloDto: HelloDto) {
    return this.prisma.hello.findMany();
  }
}
