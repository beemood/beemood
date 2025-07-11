import { Put, Type } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export type UdpateOneOptions = {
  returnType: Type;
};

export function UdpateOne(options: UdpateOneOptions): MethodDecorator {
  return (...args) => {
    Put(':id')(...args);
    ApiOperation({ summary: 'Update one by id' })(...args);
    ApiOkResponse({ type: options.returnType })(...args);
  };
}
