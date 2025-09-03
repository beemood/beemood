import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const PREFIX = config.getOrThrow('PREFIX');
  const PORT = config.getOrThrow('PORT');

  app.enableCors({ origin: ['*'] });
  app.setGlobalPrefix(PREFIX);
  app.use(helmet());
  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Inventory api')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {});

  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
