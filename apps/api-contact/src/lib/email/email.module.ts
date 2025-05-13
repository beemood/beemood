import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['email'] })],
  controllers: [EmailController],
})
export class EmailModule {}
