import { GetAll, Post, ResourceController } from '@beemood/nestjs';
import { InjectRepository } from '@beemood/nestjs-prisma';

import { ApiBody, ApiOperation } from '@nestjs/swagger';

import { Prisma } from '@beemood/sample-db';
import { Body } from '@nestjs/common';
@ResourceController('samples')
export class SampleController {
  constructor(
    @InjectRepository('sample') protected readonly repo: Prisma.SampleDelegate
  ) {}

  @ApiOperation({ summary: 'Get hello message' })
  @GetAll()
  findAll() {
    return this.repo.findMany();
  }

  @ApiBody({
    schema: { properties: { name: { type: 'string' } } },
  })
  @Post()
  create(@Body() data: Prisma.SampleCreateInput) {
    return this.repo.create({
      data,
    });
  }
}
