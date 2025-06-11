import { Property } from '@bmod/property';
import { SelectHrDto } from '../query-dto/select-hr.dto.js';

export function SelectHrProperty(): PropertyDecorator {
  return (...args) => {
    Property({
      type: 'object',
      target: () => SelectHrDto,
      transform: true,
    })(...args);
  };
}
