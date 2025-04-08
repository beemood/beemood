import { RequiredDateValue, RequiredNumberValue } from '@bmod/types';
import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class BaseDto {
  @Property({ type: 'integer' }) id = RequiredNumberValue();

  @Property({ type: 'string', format: 'date' }) createdAt = RequiredDateValue();

  @Property({ type: 'string', format: 'date' }) updatedAt = RequiredDateValue();

  @Property({ type: 'string', format: 'date' }) deletedAt = RequiredDateValue();
}
