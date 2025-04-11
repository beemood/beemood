import {
  Body as __Body,
  Param as __Param,
  Query as __Query,
  createParamDecorator,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

export function Body(): ParameterDecorator {
  return (...args) => {
    __Body(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          exposeUnsetFields: false,
          exposeDefaultValues: false,
        },
      })
    )(...args);
  };
}

export function Query(): ParameterDecorator {
  return (...args) => {
    __Query(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          exposeUnsetFields: false,
          exposeDefaultValues: false,
        },
      })
    )(...args);
  };
}
export function ParamId(): ParameterDecorator {
  return (...args) => {
    __Param('id', ParseIntPipe)(...args);
  };
}

export function Param(): ParameterDecorator {
  return (...args) => {
    __Param(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          exposeUnsetFields: false,
          exposeDefaultValues: false,
        },
      })
    )(...args);
  };
}

export const UserId = createParamDecorator((data, context) => {
  return context.switchToHttp().getRequest().userId;
});

export const SessionId = createParamDecorator((data, context) => {
  return context.switchToHttp().getRequest().sessionId;
});

export const BearerToken = createParamDecorator((data, context) => {
  return context.switchToHttp().getRequest().bearer;
});
