import { HttpAuthGuard } from '@bmod/auth-api';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HttpAuthGuard,
    },
  ],
})
export class AuthApiModule {}
