import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProjectDto {
  @Field() name?: string;
  @Field() id?: number;
  @Field() createdAt?: Date;
  @Field() updatedAt?: Date;
  @Field() deletedAt?: Date;
  @Field() isActive?: boolean;
  @Field() description?: string;
  @Field() startedAt?: Date;
  @Field() endedAt?: Date;
  @Field() dueAt?: Date;
}
