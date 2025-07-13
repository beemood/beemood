import { Controller, Get, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaClient } from '@beemood/inventory-db';
import { PrismaModule } from '@beezone/prisma';
import { CategoryModule } from './resources/category/category.module.js';

@Controller()
export class AppController {
  @Get('hello')
  get() {
    return { message: 'Hello' };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({}),
    EventEmitterModule.forRoot({ delimiter: '.' }),
    ScheduleModule.forRoot({}),
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 10_000, limit: 5 }] }),
    PrismaModule.forRoot({ prismaClientClass: PrismaClient }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
