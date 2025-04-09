import { Dto, Property } from '@bmod/validation';

@Dto()
export class ProfileDto {
  @Property({ type: 'string' }) username: string;
  @Property({ type: 'string' }) avatarUrl: string;
}
