import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { SessionModule } from './session/session.module';
import { UserService } from './user/user.service';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/auth', mongooseOptions), SessionModule, CoffeeModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
