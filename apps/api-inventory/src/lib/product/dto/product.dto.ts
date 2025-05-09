import { Model, Property } from '@bmod/property';

@Model()
export class Product {
  @Property({ type: 'integer' }) id: number;
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}
