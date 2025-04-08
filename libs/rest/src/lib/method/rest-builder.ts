import type { Type } from '@nestjs/common';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

export type RestBuilderOptions = {
  dto: Type;
  createDto: Type;
  updateDto: Type;
  queryDto: Type;
};

export class RestBuilder {
  constructor(protected readonly options: RestBuilderOptions) {}

  Controller(path: string): ClassDecorator {
    return (...args) => {
      Controller(path)(...args);
      ApiTags(this.options.dto.name + 'Controller')(...args);
      ApiBearerAuth()(...args);
    };
  }

  Create(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Create ${this.options.dto.name}` })(...args);
      ApiCreatedResponse({ type: this.options.dto })(...args);
      Post()(...args);
    };
  }

  Read(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Find all ${this.options.dto.name}` })(...args);
      ApiOkResponse({ type: this.options.dto, isArray: true })(...args);
      Get()(...args);
    };
  }

  ReadById(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Find ${this.options.dto.name} by id` })(...args);
      ApiOkResponse({ type: this.options.dto })(...args);
      Get(':id')(...args);
    };
  }

  DeleteById(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Delete ${this.options.dto.name} by id` })(
        ...args
      );
      ApiOkResponse({ type: this.options.dto })(...args);
      Delete(':id')(...args);
    };
  }

  UpdateById(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Delete ${this.options.dto.name} by id` })(
        ...args
      );
      ApiOkResponse({ type: this.options.dto })(...args);
      Put(':id')(...args);
    };
  }
}
