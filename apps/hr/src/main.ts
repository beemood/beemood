import {
  Logger,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './lib/app.module.js';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { exposeDefaultValues: true, exposeUnsetFields: false },
      validationError: { target: false, value: false },
      exceptionFactory(errors) {
        throw new UnprocessableEntityException(errors);
      },
    })
  );
  const c = app.get(ConfigService);
  const PORT = c.getOrThrow('PORT');
  const APP_NAME = c.getOrThrow('APP_NAME');
  const APP_DESCRIPTION = c.getOrThrow('APP_DESCRIPTION');

  const swaggerConfig = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
    autoTagControllers: true,
  });

  SwaggerModule.setup('api', app, swaggerDoc);

  await app.listen(PORT, () => {
    Logger.log(`🚀 a hr app is up and running at port ${PORT}`);
  });
}

bootstrap();
