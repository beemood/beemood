import { InjectRepo, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { departmentData } from './department/department-data.js';
import { industryData } from './industry/industry-data.js';
import { jobTitleData } from './job-title/job-title-data.js';

@Module({
  imports: [
    PrismaModule.forFeature({
      resources: [
        'address',
        'company',
        'contact',
        'department',
        'email',
        'industry',
        'jobTitle',
        'phone',
        'socialMedia',
        'website',
      ],
    }),
  ],
})
export class AppSeedModule implements OnModuleInit {
  constructor(
    @InjectRepo('address') protected readonly address: Prisma.AddressDelegate,
    @InjectRepo('company') protected readonly company: Prisma.CompanyDelegate,
    @InjectRepo('contact') protected readonly contact: Prisma.ContactDelegate,
    @InjectRepo('department')
    protected readonly department: Prisma.DepartmentDelegate,
    @InjectRepo('email') protected readonly email: Prisma.EmailDelegate,
    @InjectRepo('industry')
    protected readonly industry: Prisma.IndustryDelegate,
    @InjectRepo('jobTitle')
    protected readonly jobTitle: Prisma.JobTitleDelegate,
    @InjectRepo('phone') protected readonly phone: Prisma.PhoneDelegate,
    @InjectRepo('socialMedia')
    protected readonly socialMedia: Prisma.SocialMediaDelegate,
    @InjectRepo('website') protected readonly website: Prisma.WebsiteDelegate
  ) {}

  async onModuleInit() {
    for (const data of industryData) {
      try {
        await this.industry.create({ data });
      } catch {
        //
      }
    }

    for (const data of jobTitleData) {
      try {
        await this.jobTitle.create({ data });
      } catch {
        //
      }
    }

    for (const data of departmentData) {
      try {
        await this.department.create({ data });
      } catch {
        //
      }
    }

    try {
      await this.company.create({
        data: { name: 'Brightline', industryId: 1 },
      });
    } catch {
      //
    }

    const foundCompanies = await this.company.findMany();
    const foundJobTitles = await this.jobTitle.findMany();
    const foundDepartments = await this.department.findMany();
    try {
      await this.contact.create({
        data: {
          firstName: 'Robert',
          lastName: 'Brightline',
          gender: 'MALE',
          primaryEmail: 'robert.brightline@gmail.com',
          primaryPhone: '+19009009999',
          jobTitleId: foundJobTitles[0].id,
          companyId: foundCompanies[0].id,
          departmentId: foundDepartments[0].id,
        },
      });
    } catch {
      //
    }

    const [foundContact] = await this.contact.findMany();
    await this.website.create({
      data: { url: 'http://beemood.github.io', contactId: foundContact.id },
    });
    await this.socialMedia.create({
      data: { url: 'http://beemood.github.io', contactId: foundContact.id },
    });

    await this.email.create({
      data: {
        email: 'robert.brightline@gmail.com',
        contactId: foundContact.id,
      },
    });

    await this.phone.create({
      data: {
        phone: '+19009009999',
        contactId: foundContact.id,
      },
    });
  }
}
