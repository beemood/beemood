import { Dto, Property } from '@bmod/validation';

@Dto()
export class LoginDto {
  @Property({ type: 'string', required: true, stringFormat: 'email' })
  username: string;

  @Property({ type: 'string', required: true, stringFormat: 'password' })
  password: string;
}
