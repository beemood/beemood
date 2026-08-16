import { InputType, Prop } from '@beemood/prop/graphql';

@InputType()
export class ProjectCreateDto {
  @Prop({ required: true }) name: string;
  @Prop() description?: string;
}
