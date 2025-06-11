import { Property } from '@bmod/property';
import { OmitHrDto } from '../query-dto/omit-hr.dto.js';

export function OmitHrProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'object',
      target: () => OmitHrDto,
      transform: true,
    })(...args);
  };
}
