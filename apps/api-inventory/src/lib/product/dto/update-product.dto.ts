import { Model } from '@bmod/property';
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto.js';

@Model()
export class UpdateProductDto extends PartialType(CreateProductDto) {}
