/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  CreateOne,
  DeleteOneById,
  FindAll,
  FindOneById,
  ParamId,
  Query,
  ResourceController,
  UpdateOneById,
} from '@bmod/nest';
import { InjectRepo } from '@bmod/prisma';
import type { Type } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

export type RestControllerOptions = {
  name: string;
  createDto: () => Type;
  updateDto: () => Type;
  readDto: () => Type;
  findOneDto: () => Type;
  findManyDto: () => Type;
};

export function RestController(options: RestControllerOptions): Type {
  const { name, createDto, readDto, updateDto, findManyDto, findOneDto } =
    options;

  @ResourceController(name, [])
  class GeneratedController {
    constructor(@InjectRepo(name) protected readonly repo: any) {}

    @CreateOne(readDto)
    @ApiBody({ type: createDto() })
    async createOne(@Body() data: any, @Query() query: any) {
      return await this.repo.create({ ...query, data });
    }

    @FindAll(readDto)
    @ApiQuery({ type: findManyDto(), })
    async findAll(@Query() query: any) {
      return await this.repo.findMany(query);
    }

    @FindOneById(readDto)
    @ApiQuery({ type: findOneDto() })
    async findOneById(@ParamId() id: number, @Query() query: any) {
      query.where.id = id;
      return await this.repo.findFirst(query);
    }

    @UpdateOneById(readDto)
    @ApiBody({ type: updateDto() })
    @ApiQuery({ type: findOneDto() })
    async updateOneById(
      @ParamId() id: number,
      @Body() data: any,
      @Query() query: any
    ) {
      query.where.id = id;
      return await this.repo.update({ ...query, data });
    }

    @DeleteOneById(readDto)
    @ApiQuery({ type: findOneDto() })
    async deleteOneById(@ParamId() id: number, @Query() query: any) {
      query.where.id = id;
      return await this.repo.delete(query);
    }
  }

  return GeneratedController;
}
