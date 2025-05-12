import { GlobalValidationPipe } from '@bmod/nest';
import { Config } from '@bmod/types';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './index.js';

export async function main() {
  const app = await NestFactory.create(AppModule, { logger: ['log'] });

  const config = app.get(ConfigService);
  const PORT = config.getOrThrow(Config.PORT);
  const APP_NAME = config.getOrThrow(Config.APP_NAME);
  const APP_DESCRIPTION = config.getOrThrow(Config.APP_DESCRIPTION);
  const GLOBAL_PREFIX = config.getOrThrow(Config.GLOBAL_PREFIX);

  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(GlobalValidationPipe);

  const swagggerDoc = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .addBearerAuth()
    .build();

  const swaggerDoc = await SwaggerModule.createDocument(app, swagggerDoc, {
    autoTagControllers: true,
  });
  SwaggerModule.setup(GLOBAL_PREFIX, app, swaggerDoc);

  await app.listen(PORT);

  Logger.log(`🚀 ${APP_NAME} is up and running at port ${PORT}.`);
}
