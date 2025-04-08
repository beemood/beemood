import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class NumberQueryDto {
  @Property({ type: 'number', transform: true }) equals?: number;
  @Property({ type: 'number', transform: true }) gt?: number;
  @Property({ type: 'number', transform: true }) gte?: number;
  @Property({
    type: 'array',
    items: { type: 'number', transform: true },
    transform: true,
  })
  in?: number[];

  @Property({ type: 'number', transform: true }) lt?: number;
  @Property({ type: 'number', transform: true }) lte?: number;
  @Property({ type: 'number', transform: true }) not?: number;
  @Property({
    type: 'array',
    items: { type: 'number', transform: true },
    transform: true,
  })
  notIn?: number[];
}
