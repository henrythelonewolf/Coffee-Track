import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { cookieSecretKey } from './shared/configs/tokens.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(cookieSecretKey));
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:8080'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
