import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class BaseDto<DateType = string> {
  @Property({ type: 'integer' }) id: number;
  @Property({ type: 'string', format: 'date' }) createdAt: DateType;
  @Property({ type: 'string', format: 'date' }) updatedAt: DateType;
  @Property({ type: 'string', format: 'date' }) deletedAt: DateType | null;
}
