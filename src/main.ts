import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();