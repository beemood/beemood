import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type {
  NestFastifyApplication
} from '@nestjs/platform-fastify';
import {
  FastifyAdapter
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { HelloAppModule } from './app/hello-app.module.js';
import type { BootstrapOptions } from './bootstrap-options.js';

/**
 * Bootstrap the sample service
 */
export async function bootstrap(options?: BootstrapOptions) {
  const app = await NestFactory.create<NestFastifyApplication>(
    HelloAppModule,
    new FastifyAdapter()
  );

  const config = app.get(ConfigService);

  const PREFIX = options?.prefix || config.getOrThrow('PREFIX');
  const PORT = options?.port || config.getOrThrow('PORT');
  const PROFILE = options?.profile || config.getOrThrow('PROFILE');

  // Add prefix
  app.setGlobalPrefix(PREFIX);

  app.enableCors({ origin: '*' });

  // // Add global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { exposeUnsetFields: false },
    })
  );

  // Configure helmet
  app.use(helmet());

  // Configure swagger
  SwaggerModule.setup(
    PREFIX,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth()
        .setTitle(` hello-app (${PROFILE})`)
        .setDescription('This is a sample app')
        .build(),
      {}
    )
  );

  // Start the app
  await app.listen(PORT);
  Logger.log(`🚀 hello-app is up and running at ${await app.getUrl()}`);
}
