import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/auth-api';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          global: true,
          secret: config.getOrThrow('JWT_SECRET'),
          signOptions: {
            algorithm: 'ES256',
            expiresIn: '1w',
          },
        };
      },
    }),
    PrismaModule.configure({ client: PrismaClient, models: Prisma.ModelName }),
    AuthModule,
  ],
})
export class AuthApiModule {}
