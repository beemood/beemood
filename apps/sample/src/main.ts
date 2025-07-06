import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api';

  const app = await NestFactory.create(AppModule);

  const cnf = app.get(ConfigService);

  const PORT = cnf.getOrThrow('PORT');

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors({ origin: ['*'] });
  app.use(helmet());

  const docConf = new DocumentBuilder()
    .setTitle('sample')
    .setDescription('sample description')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, docConf);
  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(PORT);

  const URL = await app.getUrl();
  Logger.log(`🚀 sample app is up and runnint at  ${URL}`);
}

bootstrap();
