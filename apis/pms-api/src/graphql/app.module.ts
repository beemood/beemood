import { PrismaClient } from '@beemood/pms-db/client';
import {
  ClientModule,
  provideDefaultPgPoolOptions,
  providePgAdapter,
} from '@beemood/prisma';
import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectModule } from './resources/project/project.module.js';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { InputValidationPipe } from '@beemood/prop/graphql';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ClientModule.forRoot({
      prismaClient: PrismaClient,
    }),
    ProjectModule,
  ],
  providers: [
    provideDefaultPgPoolOptions(),
    providePgAdapter(),
    {
      provide: APP_PIPE,
      useClass: InputValidationPipe,
    },
  ],
})
export class AppModule {}
