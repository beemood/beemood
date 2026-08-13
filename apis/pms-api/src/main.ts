import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainModule } from './main.module.js';

function config(configService: ConfigService) {
  const env = (key: string, defaultValue?: string | number) =>
    configService.getOrThrow(key, defaultValue);
  const APP_ID = env('APP_ID');
  const PORT = env('PORT', 3000);
  return {
    APP_ID,
    PORT,
  };
}
export async function main() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(MainModule, { logger: ['verbose'] });

  const { APP_ID, PORT } = config(app.get(ConfigService));

  AppConfigs: {
    app.enableCors();
    app.enableShutdownHooks();
  }

  AppInterceptors: {
    //
  }

  SwaggerConfigs: {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP_ID)
      .addBearerAuth()
      .build();

    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
      autoTagControllers: true,
      deepScanRoutes: true,
    });

    SwaggerModule.setup('api', app, swaggerDoc);
  }

  Start: {
    await app.listen(PORT);
    const url = await app.getUrl();
    logger.log(`${APP_ID} is up and running at ${url}`);
    logger.log(`${APP_ID} doc is up and running at ${url}/api`);
  }
}
