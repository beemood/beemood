import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HelloDto } from './hello-app.dto.js';
import { HelloResponseDto } from './hello-app.response.js';
import { HelloAppService } from './hello-app.service.js';

@Controller()
export class HelloAppController {
  constructor(
    @Inject(HelloAppService) protected readonly service: HelloAppService
  ) {}

  @ApiOkResponse({ type: HelloResponseDto })
  @ApiOperation({ summary: 'Say hello' })
  @ApiBody({ type: HelloDto })
  @Post('hello')
  hello(@Body() helloDto: HelloDto) {
    return this.service.hello(helloDto);
  }
}
