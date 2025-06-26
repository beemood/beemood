import { Dto, Property } from '@beemood/property';
/**
 * Id object to validate id parameters
 */
@Dto()
export class IDDto {
  @Property({ type: 'string' })
  id: number;
}
