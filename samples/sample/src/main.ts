import { extractResourceName } from '@beemood/nestjs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { PrismaExceptionFilter } from './lib/interceptors/prisma-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const GLOBAL_PREFIX = 'api';

  app.useGlobalFilters(new PrismaExceptionFilter());
  app.enableCors();
  app.use(helmet());
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Sample api')
    .setDescription('Sample api to test beemood packages')
    .setVersion('1.0')

    .build();

  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const resouceName = extractResourceName(controllerKey);
      return `${resouceName}.${methodKey}`;
    },
  });
  SwaggerModule.setup(GLOBAL_PREFIX, app, document, {
    customCssUrl: 'assets/themes/theme-flattop.css',
  });

  await app.listen(3000);
  Logger.log(`Application is running on ${await app.getUrl()}`);
}

console.log(process.env.DATABASE_URL, '<<<<<<');
bootstrap();
