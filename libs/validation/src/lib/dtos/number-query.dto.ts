import { ArrayValue, NumberValue } from '@bmod/types';
import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class NumberQueryDto {
  @Property({ type: 'number', transform: true }) equals? = NumberValue();
  @Property({ type: 'number', transform: true }) gt? = NumberValue();
  @Property({ type: 'number', transform: true }) gte? = NumberValue();
  @Property({
    type: 'array',
    items: { type: 'number', transform: true },
    transform: true,
  })
  in? = ArrayValue<number>();

  @Property({ type: 'number', transform: true }) lt? = NumberValue();
  @Property({ type: 'number', transform: true }) lte? = NumberValue();
  @Property({ type: 'number', transform: true }) not? = NumberValue();
  @Property({
    type: 'array',
    items: { type: 'number', transform: true },
    transform: true,
  })
  notIn? = ArrayValue<number>();
}
