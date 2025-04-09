import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { PmsApiModule } from './app/pms-api.module.js';

export type BootstrapOptions = {
  port: number;
  prefix: string;
  profile?: string;
};

/**
 * Bootstrap the sample service
 */
export async function bootstrap(options?: BootstrapOptions) {
  const app = await NestFactory.create<NestFastifyApplication>(
    PmsApiModule,
    new FastifyAdapter({ requestTimeout: 5000 })
  );

  const config = app.get(ConfigService);

  const PREFIX = options?.prefix || config.getOrThrow('PREFIX');
  const PORT = options?.port || config.getOrThrow('PORT');
  const PROFILE = options?.profile || config.getOrThrow('PROFILE');

  // Add prefix
  app.setGlobalPrefix(PREFIX);

  app.enableCors({ origin: '*' });

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
        .setTitle(` pms-api (${PROFILE})`)
        .setDescription('This is a sample app')
        .build(),
      {}
    )
  );

  // Start the app
  await app.listen(PORT);
  Logger.log(`🚀 pms-api is up and running at ${await app.getUrl()}`);
}
