import { Dto, Property } from '@bmod/validation';

@Dto()
export class ForgotPasswordDto {
  @Property({ type: 'string', required: true }) username: string;
}
