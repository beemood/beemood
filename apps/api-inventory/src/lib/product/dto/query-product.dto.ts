import { Model, Property } from '@bmod/property';

@Model()
export class QueryWhereProductDto {
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}

@Model()
export class QueryProductDto {
  @Property({ type: 'object', target: () => QueryWhereProductDto })
  where: QueryWhereProductDto;
}
