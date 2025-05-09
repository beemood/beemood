import { Model, Property } from '@bmod/property';

@Model()
export class QueryProductDto {
  @Property({ type: 'string' }) name: string;
}
