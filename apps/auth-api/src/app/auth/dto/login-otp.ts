import { Dto, Property } from '@bmod/validation';

@Dto()
export class LoginOtpDto {
  @Property({ type: 'string', required: true, maxLength: 100 })
  username: string;

  @Property({
    type: 'string',
    required: true,
    minLength: 6,
    maxLength: 6,
    pattern: /\d{6}/,
  })
  otp: string;
}
