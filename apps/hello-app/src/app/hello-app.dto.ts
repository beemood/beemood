import { Dto, Property } from '@bmod/validation';

@Dto()
export class HelloDto {
  @Property({ type: 'string', minLength: 3 })
  name: string;
}
