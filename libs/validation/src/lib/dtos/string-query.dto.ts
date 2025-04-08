import { ArrayValue, StringQueryMode, StringValue } from '@bmod/types';
import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class StringQueryDto {
  @Property({ type: 'string' }) contains? = StringValue();

  @Property({ type: 'string' }) endsWith? = StringValue();

  @Property({ type: 'string' }) equals? = StringValue();

  @Property({ type: 'string' }) gt? = StringValue();

  @Property({ type: 'string' }) gte? = StringValue();

  @Property({ type: 'array', items: { type: 'string' }, transform: true })
  in? = ArrayValue<string>();

  @Property({ type: 'string' }) lt? = StringValue();

  @Property({ type: 'string' }) lte? = StringValue();

  @Property({ type: 'string', isIn: ['default', 'insensitive'] }) mode? =
    StringQueryMode();

  @Property({ type: 'string' }) not? = StringValue();

  @Property({ type: 'array', items: { type: 'string' }, transform: true })
  notIn? = ArrayValue<string>();

  @Property({ type: 'string' }) startsWith? = StringValue();
}
