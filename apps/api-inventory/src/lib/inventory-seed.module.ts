import { InjectRepo, PrismaModule } from '@bmod/prisma';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import type { Prisma as P } from '@prisma/client';
import { v4 } from 'uuid';
import { categoryData } from './category/category-data.js';
import { departmentData } from './department/department-data.js';
import { priceLevelData } from './price-level/price-level-data.js';
import { productData } from './product/product-data.js';
import { tagData } from './tag/tag-data.js';
@Module({
  imports: [
    PrismaModule.forFeature({
      resources: [
        'category',
        'department',
        'price',
        'priceLevel',
        'product',
        'productVariant',
        'quantity',
        'store',
        'tag',
      ],
    }),
  ],
})
export class InventorySeedModule implements OnModuleInit {
  constructor(
    @InjectRepo('store') protected readonly store: P.StoreDelegate,
    @InjectRepo('product') protected readonly product: P.ProductDelegate,
    @InjectRepo('productVariant')
    protected readonly productVariant: P.ProductVariantDelegate,
    @InjectRepo('category') protected readonly category: P.CategoryDelegate,
    @InjectRepo('department')
    protected readonly department: P.DepartmentDelegate,
    @InjectRepo('price') protected readonly price: P.PriceDelegate,
    @InjectRepo('priceLevel')
    protected readonly priceLevel: P.PriceLevelDelegate,
    @InjectRepo('quantity') protected readonly quantity: P.QuantityDelegate,
    @InjectRepo('tag') protected readonly tag: P.QuantityDelegate
  ) {}

  async onModuleInit() {
    [
      [this.category, categoryData],
      [this.department, departmentData],
      [this.priceLevel, priceLevelData],
      [this.tag, tagData],
      [this.product, productData],
    ].forEach(async ([c, d]) => {
      for (const data of d as any) {
        try {
          await (c as any).create({ data });
        } catch {
          //
        }
      }
    });

    const allPriceLevels = await this.priceLevel.findMany();
    const allProducts = await this.product.findMany();

    // Create default variants
    for (const data of allProducts) {
      try {
        await this.productVariant.create({
          data: { barcode: v4(), sku: v4(), productId: data.id },
        });
      } catch {
        //
      }
    }

    const allProductVariants = await this.productVariant.findMany();

    // Create store and quantities
    for (const priceLevelData of allPriceLevels) {
      try {
        const savedStore = await this.store.create({
          data: { name: priceLevelData.name, priceLevelId: priceLevelData.id },
        });

        for (const productVariantData of allProductVariants) {
          await this.quantity.create({
            data: {
              quantity: 0,
              minumumQuantity: 0,
              productVariantId: productVariantData.id,
              storeId: savedStore.id,
            },
          });

          await this.price.create({
            data: {
              cost: 80,
              price: 100,
              priceLevelId: priceLevelData.id,
              productVariantId: productVariantData.id,
            },
          });
        }
      } catch {
        //
      }
    }

    // Create prices
  }
}
