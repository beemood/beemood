import { ConfigService } from '@nestjs/config';
import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';

@ObjectType()
export class UserInfo {
  @Field(() => String) appId: string;
  @Field(() => String) port: string;
}

@Resolver()
export class AppResolver {
  constructor(protected readonly config: ConfigService) {}

  @Query(() => UserInfo)
  info() {
    const appId = this.config.get('APP_ID');
    const port = this.config.get('PORT');
    return { appId, port };
  }
}
