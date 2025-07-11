import { Post, Type } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

export type SaveOneOptions = {
  returnType: Type;
};

export function SaveOne(options: SaveOneOptions): MethodDecorator {
  return (...args) => {
    Post()(...args);
    ApiOperation({ summary: 'Save one' })(...args);
    ApiCreatedResponse({ type: options.returnType })(...args);
  };
}
