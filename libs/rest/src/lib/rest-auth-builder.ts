import type { Type } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Operation, OperationName, Public } from './metadata.js';

export type RestAuthBuilderOptions = {
  loginDto: Type;
  profileDto: Type;
};

export class RestAuthBuilder {
  constructor(protected readonly options: RestAuthBuilderOptions) {}

  Controller(path = 'auth'): ClassDecorator {
    return (...args) => {
      Controller(path)(...args);
      ApiTags(args[0].name)(...args);
    };
  }

  Login(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'Login' })(...args);
      ApiOkResponse()(...args);
      Public()(...args);
      Post('login')(...args);
    };
  }

  Profile(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: 'View profile' })(...args);
      ApiOkResponse({ type: this.options.profileDto })(...args);
      Operation(OperationName.READ_OWN)(...args);
      Get('profile')(...args);
    };
  }
}
