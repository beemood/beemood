import { Property } from '@bmod/property';
import { OrderHrDto } from '../query-dto/order-hr.dto.js';

export function OrderHrProperty(): PropertyDecorator {
  return (...args) => {
    Property({ type: 'object', target: () => OrderHrDto, transform: true })(
      ...args
    );
  };
}
