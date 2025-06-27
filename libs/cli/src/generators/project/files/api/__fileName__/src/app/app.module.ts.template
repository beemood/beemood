import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaClientModule } from '@beemood/prisma';
import { PrismaClient } from '@bms/prisma-inventory';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaClientModule.forRoot({ client: PrismaClient }),
    EventEmitterModule.forRoot({ delimiter: '.' }),
    ScheduleModule.forRoot(),
    CategoryModule,
  ],
})
export class AppModule {}
