import { HttpAuthGuard } from '@bmod/auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ProjectModule } from './project/project.module.js';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HttpAuthGuard,
    },
  ],
})
export class PmsApiModule {}
