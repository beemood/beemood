import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class DateQueryDto {
  @Property({ type: 'string', format: 'date' }) equals?: Date;
  @Property({ type: 'string', format: 'date' }) gt?: Date;
  @Property({ type: 'string', format: 'date' }) gte?: Date;
  @Property({
    type: 'array',
    items: { type: 'string', format: 'date' },
    transform: true,
  })
  in?: Date[];

  @Property({ type: 'string', format: 'date', transform: true }) lt?: Date;
  @Property({ type: 'string', format: 'date', transform: true }) lte?: Date;
  @Property({ type: 'string', format: 'date', transform: true }) not?: Date;
  @Property({
    type: 'array',
    items: { type: 'string', format: 'date' },
    transform: true,
  })
  notIn?: Date[];
}
