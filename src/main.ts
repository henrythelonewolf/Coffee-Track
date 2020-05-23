import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

export const cookieSecretKey = 'B5r+/HF5JJW4YerVYBPMQAOuM4Q0+MxqBJ0/gOmfbhMPGBKbDeDyzasTugJkh74TLgfkeBnG6ZwYXOBxdRHZKwOBO4B+Y8VNvcbapbVKBSFZzUVv1GSC/I3adXIwuh3aLgHhYy+BJ5TeGeWesk0EUO1YVvY1A+k9uIHYaEXxzy3n6eHNUN0iFJZ2fe306J6NNK89BOTya/lHhPnrOo7qmQDdKUVUGb/hQytG92Ik+ztUGJJnDlqcKeF7sHq2yienV2oLwpl/wMa530P4BrNRqSjJtV+UsJYjvQrauf0p5gMPsabyhOfdMEtLAiF6L5rfpWF9M1RMKYk3ZL6x3EkkoQ==';

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
