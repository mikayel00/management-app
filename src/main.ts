import { NestFactory } from '@nestjs/core';
import AppModule from './index';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get('global.port'));
}
bootstrap();
