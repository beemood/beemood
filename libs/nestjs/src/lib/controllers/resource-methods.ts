import {
  Get,
  Delete as NestDelete,
  Post as NestPost,
  Put,
} from '@nestjs/common';

export const ID_PLACEHOLDER = ':id';

export function ResourceMethod(): MethodDecorator {
  return () => {
    //
  };
}

export function GetAll(): MethodDecorator {
  return (...args) => {
    Get()(...args);
  };
}

export function GetOneById(): MethodDecorator {
  return (...args) => {
    Get(ID_PLACEHOLDER)(...args);
  };
}

export function Post(): MethodDecorator {
  return (...args) => {
    NestPost()(...args);
  };
}

export function Update(): MethodDecorator {
  return (...args) => {
    Put(ID_PLACEHOLDER)(...args);
  };
}

export function Delete(): MethodDecorator {
  return (...args) => {
    NestDelete(ID_PLACEHOLDER)(...args);
  };
}
