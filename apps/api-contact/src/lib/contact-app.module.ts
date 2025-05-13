import { PrismaModule } from '@bmod/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AddressModule } from './address/address.module.js';
import { CompanyModule } from './company/company.module.js';
import { ContactModule } from './contact/contact.module.js';
import { DepartmentModule } from './department/department.module.js';
import { EmailModule } from './email/email.module.js';
import { IndustryModule } from './industry/industry.module.js';
import { JobTitleModule } from './job-title/job-title.module.js';
import { PhoneModule } from './phone/phone.module.js';
import { SocialMediaModule } from './social-media/social-media.module.js';
import { WebsiteModule } from './website/website.module.js';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule,
    PrismaModule.forRoot(),
    AddressModule,
    CompanyModule,
    ContactModule,
    DepartmentModule,
    EmailModule,
    IndustryModule,
    JobTitleModule,
    PhoneModule,
    SocialMediaModule,
    WebsiteModule,
  ],
})
export class ContactAppModule {}
