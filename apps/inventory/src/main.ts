import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function main() {
  const app = await NestFactory.create(AppModule);

  {
    app.use(helmet());
    app.enableCors();
    app.setGlobalPrefix('api');
  }

  const conf = app.get(ConfigService);
  const PORT = conf.getOrThrow('PORT');

  {
    const conf = new DocumentBuilder()
      .setTitle('Inventory API')
      .setDescription('Inventory api documentation')
      .build();
    const doc = SwaggerModule.createDocument(app, conf, {
      autoTagControllers: true,
    });
    SwaggerModule.setup('api', app, doc);
  }

  {
    await app.listen(PORT);
    Logger.log(`App is running at (${await app.getUrl()})`);
  }
}

main();
