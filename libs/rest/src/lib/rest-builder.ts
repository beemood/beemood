import type { Type } from '@nestjs/common';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Operation, OperationName, Resource } from './metadata.js';

export type RestBuilderOptions = {
  resourceName: string;
  dto: Type;
  createDto: Type;
  updateDto: Type;
  queryDto: Type;
};

export class RestBuilder {
  constructor(protected readonly options: RestBuilderOptions) {}

  Controller(path: string): ClassDecorator {
    return (...args) => {
      ApiTags(this.options.dto.name + 'Controller')(...args);
      ApiBearerAuth()(...args);
      Resource(this.options.resourceName);
      Controller(path)(...args);
    };
  }

  Create(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Create ${this.options.dto.name}` })(...args);
      ApiCreatedResponse({ type: this.options.dto })(...args);
      Operation(OperationName.WRITE_ONE)(...args);
      Post()(...args);
    };
  }

  Read(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Find all ${this.options.dto.name}` })(...args);
      ApiOkResponse({ type: this.options.dto, isArray: true })(...args);
      Operation(OperationName.READ)(...args);
      Get()(...args);
    };
  }

  ReadById(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Find ${this.options.dto.name} by id` })(...args);
      ApiOkResponse({ type: this.options.dto })(...args);
      Operation(OperationName.READ_ONE)(...args);
      Get(':id')(...args);
    };
  }

  DeleteById(): MethodDecorator {
    return (...args) => {
      ApiOperation({ summary: `Delete ${this.options.dto.name} by id` })(
        ...args
      );
      Operation(OperationName.DELETE_ONE)(...args);
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
      Operation(OperationName.UPDATE_ONE)(...args);
      Put(':id')(...args);
    };
  }
}
