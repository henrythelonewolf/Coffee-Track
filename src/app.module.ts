import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { SessionController } from './session/session.controller';
import { UserService } from './user/user.service';
import { SessionModule } from './session/session.module';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth', mongooseOptions), SessionModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
