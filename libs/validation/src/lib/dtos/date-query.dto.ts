import { ArrayValue, StringValue } from '@bmod/types';
import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class DateQueryDto {
  @Property({ type: 'string', format: 'date' }) equals? = StringValue();

  @Property({ type: 'string', format: 'date' }) gt? = StringValue();

  @Property({ type: 'string', format: 'date' }) gte? = StringValue();

  @Property({
    type: 'array',
    items: { type: 'string', format: 'date' },
    transform: true,
  })
  in? = ArrayValue<string>();

  @Property({ type: 'string', format: 'date', transform: true }) lt? =
    StringValue();

  @Property({ type: 'string', format: 'date', transform: true }) lte? =
    StringValue();

  @Property({ type: 'string', format: 'date', transform: true }) not? =
    StringValue();

  @Property({
    type: 'array',
    items: { type: 'string', format: 'date' },
    transform: true,
  })
  notIn? = ArrayValue<string>();
}
