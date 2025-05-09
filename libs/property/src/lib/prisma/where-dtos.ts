import type {
  DateTimeFilter,
  IntFilter,
  QueryMode,
  StringFilter,
} from '@bmod/types';
import { Model } from '../property/model.js';
import { Prop } from '../property/property.js';

@Model()
export class WhereStringDto implements StringFilter {
  @Prop({ type: 'string' }) equals?: string;
  @Prop({ type: 'array', items: { type: 'string' } }) in?: string[];
  @Prop({ type: 'array', items: { type: 'string' } }) notIn?: string[];
  @Prop({ type: 'string' }) lt?: string;
  @Prop({ type: 'string' }) lte?: string;
  @Prop({ type: 'string' }) gt?: string;
  @Prop({ type: 'string' }) gte?: string;
  @Prop({ type: 'string' }) contains?: string;
  @Prop({ type: 'string' }) startsWith?: string;
  @Prop({ type: 'string' }) endsWith?: string;
  @Prop({ type: 'string', isIn: ['default', 'insensitive'] })
  mode?: QueryMode;
  @Prop({ type: 'string' }) not?: string;
}

@Model()
export class WhereNumberDto implements IntFilter {
  @Prop({ type: 'number' }) equals?: number;
  @Prop({ type: 'array', items: { type: 'number' } }) in?: number[];
  @Prop({ type: 'array', items: { type: 'number' } }) notIn?: number[];
  @Prop({ type: 'number' }) lt?: number;
  @Prop({ type: 'number' }) lte?: number;
  @Prop({ type: 'number' }) gt?: number;
  @Prop({ type: 'number' }) gte?: number;
  @Prop({ type: 'number' }) not?: number;
}

@Model()
export class WhereDateDto implements DateTimeFilter {
  @Prop({ type: 'string', format: 'date' }) equals?: string;
  @Prop({ type: 'array', items: { type: 'string' } }) in?: string[];
  @Prop({ type: 'array', items: { type: 'string' } }) notIn?: string[];
  @Prop({ type: 'string', format: 'date' }) lt?: string;
  @Prop({ type: 'string', format: 'date' }) lte?: string;
  @Prop({ type: 'string', format: 'date' }) gt?: string;
  @Prop({ type: 'string', format: 'date' }) gte?: string;
  @Prop({ type: 'string', format: 'date' }) not?: string;
}
