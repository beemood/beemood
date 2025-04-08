import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class StringQueryDto {
  @Property({ type: 'string' }) contains?: string;
  @Property({ type: 'string' }) endsWith?: string;
  @Property({ type: 'string' }) equals?: string;
  @Property({ type: 'string' }) gt?: string;
  @Property({ type: 'string' }) gte?: string;
  @Property({ type: 'array', items: { type: 'string' }, transform: true })
  in?: string[];
  @Property({ type: 'string' }) lt?: string;
  @Property({ type: 'string' }) lte?: string;
  @Property({ type: 'string', isIn: ['default', 'insensitive'] }) mode?:
    | 'default'
    | 'insensitive';
  @Property({ type: 'string' }) not?: string;
  @Property({ type: 'string' }) notIn?: string[];
  @Property({ type: 'string' }) startsWith?: string;
}
