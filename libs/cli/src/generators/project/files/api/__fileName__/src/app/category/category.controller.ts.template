import {
  Body,
  Controller,
  Delete,
  Get,
  ParamId,
  Post,
  Put,
} from '@beemood/nest';
import { InjectRepository } from '@beemood/prisma';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@bms/prisma-inventory';

@Controller({ path: 'category' })
export class CategoryController {
  constructor(
    @InjectRepository('category')
    protected readonly repo: Prisma.CategoryDelegate
  ) {}

  @Get({})
  findAll() {
    return this.repo.findMany();
  }

  @Get({ path: ':id' })
  findOneById(@ParamId() id: number) {
    return this.repo.findUnique({ where: { id } });
  }

  @Post({})
  save(@Body() data: CreateCategoryDto) {
    return this.repo.create({ data });
  }

  @Put({ path: ':id' })
  update(@ParamId() id: number, @Body() data: UpdateCategoryDto) {
    return this.repo.update({ where: { id }, data });
  }

  @Delete({ path: ':id' })
  delete(@ParamId() id: number) {
    return this.repo.delete({ where: { id } });
  }
}
