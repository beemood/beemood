import { Dto, Property } from '@beemood/property';

@Dto()
export class IDDto {
  @Property({ type: 'string' })
  id: number;
}
