import { Dto, Property } from '@bmod/validation';

@Dto()
export class ResetPasswordDto {
  @Property({ type: 'string', required: true, stringFormat: 'password' })
  password: string;

  @Property({
    type: 'string',
    required: true,
    stringFormat: 'password',
    equalToProperty: 'password',
  })
  confirmPassword: string;
}
