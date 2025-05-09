import { Model, Property } from '@bmod/property';

@Model()
export class CreateProductDto {
  @Property({ type: 'string' }) name: string;
  @Property({ type: 'string' }) description: string;
}
