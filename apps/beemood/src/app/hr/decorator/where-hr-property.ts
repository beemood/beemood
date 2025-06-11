import { Property } from '@bmod/property';
import { WhereHrDto } from '../query-dto/where-hr.dto.js';

export function WhereHrProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'object',
      target: () => WhereHrDto,
      transform: true,
    })(...args);
  };
}

export function WhereHrArrayProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'array',
      items: {
        type: 'object',
        target: () => WhereHrDto,
      },
      transform: true,
    })(...args);
  };
}
