import { Property } from '@bmod/validation';

export class HelloResponseDto {
  @Property({ type: 'string' })
  message: string;
}
