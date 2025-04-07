import { Dto } from '../dto.decorator.js';
import { Property } from '../wrap/property.decorator.js';

@Dto()
export class IDDto {
  @Property({ type: 'integer', required: true }) id: number;
}
