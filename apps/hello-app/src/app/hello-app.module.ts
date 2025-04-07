/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable spellcheck/spell-checker */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/hello';
import { HelloAppController } from './hello-app.controller.js';
import { HelloAppService } from './hello-app.service.js';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HelloAppController],

  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient({
        datasourceUrl:
          'postgresql://testuser:password@localhost:5432/hello-db?schema=public',
      }),
    },
    HelloAppService,
  ],
})
export class HelloAppModule {}
