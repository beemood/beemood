import { PrismaModule } from '@beemood/nestjs-prisma';
import { PrismaClient } from '@beemood/sample-db';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigModule } from '@nestjs/config';
import { SampleModule } from './lib/sample/sample.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: 'assets',
      serveRoot: '/assets',
    }),
    PrismaModule.forRoot(PrismaClient),
    SampleModule,
  ],
})
export class AppModule {}
