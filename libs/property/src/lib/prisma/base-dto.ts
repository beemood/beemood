import type { OrderDirection } from '@bmod/types';
import { Model } from '../property/model.js';
import { Prop } from '../property/property.js';
import {
  QryAndWhereProp,
  QryDate,
  QryNotWhereProp,
  QryNum,
  QryOrd,
  QryOrWhereProp,
  QrySelect,
} from './property-decorators.js';
import type { WhereDateDto, WhereNumberDto } from './where-dtos.js';

@Model()
export class BaseReadDto {
  @Prop({ type: 'integer' }) id: number;

  @Prop({ type: 'string' }) createdAt: Date;
  @Prop({ type: 'string' }) updatedAt: Date;
  @Prop({ type: 'string' }) deletedAt: Date;
}

@Model()
export class BaseSelectDto {
  @QrySelect() id?: boolean;

  @QrySelect() createdAt?: boolean;
  @QrySelect() updatedAt?: boolean;
  @QrySelect() deletedAt?: boolean;
}

@Model()
export class BaseWhereDto {
  @QryNum() id: WhereNumberDto;

  @QryDate() createdAt: WhereDateDto;
  @QryDate() updatedAt: WhereDateDto;
  @QryDate() deletedAt: WhereDateDto;

  @QryAndWhereProp() AND: (typeof this)[];
  @QryOrWhereProp() OR: (typeof this)[];
  @QryNotWhereProp() NOT: (typeof this)[];
}

@Model()
export class BaseUniqueWhereDto {
  @Prop({ type: 'integer' }) id: number;

  @Prop({ type: 'string' }) createdAt: Date;
  @Prop({ type: 'string' }) updatedAt: Date;
  @Prop({ type: 'string' }) deletedAt: Date;
}

@Model()
export class BaseOrderDto {
  @QryOrd() id?: OrderDirection;

  @QryOrd() createdAt?: OrderDirection;
  @QryOrd() updatedAt?: OrderDirection;
  @QryOrd() deletedAt?: OrderDirection;
}
