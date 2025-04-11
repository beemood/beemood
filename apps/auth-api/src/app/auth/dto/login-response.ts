import { Dto, Property } from '@bmod/validation';

@Dto()
export class LoginResponseDto {
  @Property({ type: 'string' })
  token: string;
}
