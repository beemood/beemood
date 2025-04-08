import {
    Body as __Body,
    Param as __Param,
    Query as __Query,
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
