import { InputType, Prop } from '@beemood/nestjs/graphql';

@InputType()
export class ProjectCreateDto {
  @Prop({ required: true }) name: string;
  @Prop() description?: string;
}
