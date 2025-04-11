import { Dto, Property } from '@bmod/validation';

@Dto()
export class LoginDto {
  @Property({ type: 'string', required: true, maxLength: 100 })
  username: string;

  @Property({ type: 'string', required: true, maxLength: 100 })
  password: string;
}
