import { Dto, Property } from '@beemood/property';

@Dto()
export class TodoDto {
  @Property({
    type: 'string',
    description: 'Todo title',
    required: true,
    minLength: 3,
    maxLength: 100,
  })
  title: string;

  @Property({ type: 'string', description: 'Todo description', maxLength: 400 })
  description: string;
}
