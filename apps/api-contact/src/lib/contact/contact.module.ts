import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['contact'] })],
  controllers: [ContactController],
})
export class ContactModule {}
