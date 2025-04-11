import { Dto, Property } from '@bmod/validation';

@Dto()
export class SignupDto {
  @Property({ type: 'string', required: true, stringFormat: 'email' })
  email: string;

  @Property({ type: 'string', required: true, stringFormat: 'name' })
  firstName: string;

  @Property({ type: 'string', required: true, stringFormat: 'name' })
  lastName: string;

  @Property({ type: 'string', required: true })
  organization: string;
}
