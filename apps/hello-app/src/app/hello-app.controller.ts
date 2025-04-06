import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import type { HelloDto } from './hello-app.dto.js';
import { HelloResponseDto } from './hello-app.response.js';
import type { HelloAppService } from './hello-app.service.js';

@Controller()
export class HelloAppController {
  constructor(protected readonly service: HelloAppService) {}

  @ApiOkResponse({ type: HelloResponseDto })
  @ApiOperation({ summary: 'Say hello' })
  @Post('hello')
  hello(@Body() helloDto: HelloDto) {
    return this.service.hello(helloDto);
  }
}
