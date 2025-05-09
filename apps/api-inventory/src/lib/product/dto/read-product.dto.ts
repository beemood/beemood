import { Model, Property } from '@bmod/property';

@Model()
export class ReadProductDto {
  @Property({ type: 'integer' }) id: number;
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}
