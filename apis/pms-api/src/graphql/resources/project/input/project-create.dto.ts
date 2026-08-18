import * as G from '@beemood/nestjs/graphql';
/** Change  3 */
@G.InputType()
export class ProjectCreateDto {
  @G.Prop({ required: true }) name: string;
  @G.Prop() description?: string;
}
