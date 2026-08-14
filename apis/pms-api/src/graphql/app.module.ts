import { PrismaClient } from '@beemood/pms-db/client';
import {
  ClientModule,
  provideDefaultPgPoolOptions,
  providePgAdapter,
} from '@beemood/prisma';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver.js';
import { ProjectModule } from './resources/project/project.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    ClientModule.forRoot({
      prismaClient: PrismaClient,
      providers: [provideDefaultPgPoolOptions(), providePgAdapter()],
    }),
    ProjectModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
