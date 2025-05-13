import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller.js';

@Module({
  imports: [PrismaModule.forFeature({ resources: ['company'] })],
  controllers: [CompanyController],
})
export class CompanyModule {}
