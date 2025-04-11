import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/auth-api';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [
    PrismaModule.configure({
      client: PrismaClient,
      models: Prisma.ModelName,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
