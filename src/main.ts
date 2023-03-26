import { NestFactory } from '@nestjs/core';
import AppModule from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER } from './app/constants';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('v1');
  const config = new DocumentBuilder()
    .setTitle(SWAGGER.TITLE)
    .setDescription(SWAGGER.DESCRIPTION)
    .setVersion(SWAGGER.API_VERSION)
    .addTag(SWAGGER.TAG)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER.DOCUMENTATION_URL, app, document);

  await app.listen(configService.get('GLOBAL.PORT'));
}
bootstrap();
