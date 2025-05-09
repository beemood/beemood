import type { IntFilter, QueryMode, StringFilter, } from '@bmod/types';
import { Model } from '../property/model.js';
import { Property } from '../property/property.js';

@Model()
export class WhereStringDto implements StringFilter {
  @Property({ type: 'string' }) equals?: string;
  @Property({ type: 'array', items: { type: 'string' } }) in?: string[];
  @Property({ type: 'array', items: { type: 'string' } }) notIn?: string[];
  @Property({ type: 'string' }) lt?: string;
  @Property({ type: 'string' }) lte?: string;
  @Property({ type: 'string' }) gt?: string;
  @Property({ type: 'string' }) gte?: string;
  @Property({ type: 'string' }) contains?: string;
  @Property({ type: 'string' }) startsWith?: string;
  @Property({ type: 'string' }) endsWith?: string;
  @Property({ type: 'string', isIn: ['default', 'insensitive'] })
  mode?: QueryMode;
  @Property({ type: 'string' }) not?: string;
}

@Model()
export class WhereNumberDto implements IntFilter {
  @Property({ type: 'number' }) equals?: number;
  @Property({ type: 'array', items: { type: 'number' } }) in?: number[];
  @Property({ type: 'array', items: { type: 'number' } }) notIn?: number[];
  @Property({ type: 'number' }) lt?: number;
  @Property({ type: 'number' }) lte?: number;
  @Property({ type: 'number' }) gt?: number;
  @Property({ type: 'number' }) gte?: number;
  @Property({ type: 'number' }) not?: number;
}
