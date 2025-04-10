import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/auth-api';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.configure({ client: PrismaClient, models: Prisma.ModelName }),
  ],
})
export class AuthApiModule {}
