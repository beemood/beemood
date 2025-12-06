import {
  Get,
  Delete as NestDelete,
  Post as NestPost,
  Put,
  Type,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { extractResourceName } from '../helpers/extract-resource-name.js';

export const ID_PLACEHOLDER = ':id';

export type MethodOptions = {
  bodyType: Type;
  responseType: Type;
  queryType: Type;
};

export type GetAllOptions = Pick<MethodOptions, 'responseType'>;

export function GetAll(options: GetAllOptions): MethodDecorator {
  return (...args) => {
    const name = extractResourceName(args[0].constructor.name);
    ApiOperation({ summary: `Find all ${name}` })(...args);
    ApiOkResponse({ type: options.responseType, isArray: true })(...args);

    Get()(...args);
  };
}

export type GetOneByIdOptions = Pick<MethodOptions, 'responseType'>;
export function GetOneById(options: GetOneByIdOptions): MethodDecorator {
  return (...args) => {
    const name = extractResourceName(args[0].constructor.name);
    ApiOperation({ summary: `Find one ${name} by id` })(...args);
    ApiOkResponse({ type: options.responseType })(...args);
    ApiNotFoundResponse()(...args);
    Get(ID_PLACEHOLDER)(...args);
  };
}

export type PostOptions = Pick<MethodOptions, 'bodyType' | 'responseType'>;

export function Post(options: PostOptions): MethodDecorator {
  return (...args) => {
    const name = extractResourceName(args[0].constructor.name);
    ApiOperation({ summary: `Create one ${name}` })(...args);
    ApiBody({ type: options.bodyType })(...args);
    ApiCreatedResponse({ type: options.responseType })(...args);
    ApiConflictResponse({ description: 'Input validation failure' })(...args);
    NestPost()(...args);
  };
}

export type UpdateOptions = Pick<MethodOptions, 'bodyType' | 'responseType'>;

export function Update(options: UpdateOptions): MethodDecorator {
  return (...args) => {
    const name = extractResourceName(args[0].constructor.name);
    ApiOperation({ summary: `Upate one ${name} by id` })(...args);

    ApiBody({ type: options.bodyType })(...args);
    ApiOkResponse({ type: options.responseType })(...args);
    ApiNotFoundResponse()(...args);
    Put(ID_PLACEHOLDER)(...args);
  };
}

export type DeleteOptions = Pick<MethodOptions, 'responseType'>;

export function Delete(options: DeleteOptions): MethodDecorator {
  return (...args) => {
    const name = extractResourceName(args[0].constructor.name);
    ApiOperation({ summary: `Delete one ${name} by id` })(...args);
    ApiOkResponse({ type: options.responseType })(...args);
    ApiNotFoundResponse()(...args);
    NestDelete(ID_PLACEHOLDER)(...args);
  };
}

export type ResouceMethodOptions = {
  readDto: Type;
  createDto: Type;
  updateDto: Type;
};

export function ResourceMethod(options: ResouceMethodOptions): MethodDecorator {
  const { readDto, createDto, updateDto } = options;

  return (...args) => {
    const methodName = args[1] as
      | 'findAll'
      | 'findOneById'
      | 'create'
      | 'update'
      | 'delete';

    switch (methodName) {
      case 'findAll': {
        GetAll({ responseType: readDto })(...args);
        break;
      }
      case 'findOneById': {
        GetOneById({ responseType: readDto })(...args);
        break;
      }
      case 'create': {
        Post({ bodyType: createDto, responseType: readDto })(...args);
        break;
      }
      case 'update': {
        Update({ bodyType: updateDto, responseType: readDto })(...args);
        break;
      }
      case 'delete': {
        Delete({ responseType: readDto })(...args);
        break;
      }
      default: {
        // The target property does not match any method name
        break;
      }
    }
  };
}
