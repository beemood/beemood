import * as G from '@beemood/nestjs/graphql';

@G.InputType()
export class ProjectCreateDto {
  @G.Prop({ required: true }) name: string;
  @G.Prop() description?: string;
}
