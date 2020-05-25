import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controllers/app.controller';
import { Role, RoleSchema } from './dal/schemas/role.schema';
import { User, UserSchema } from './dal/schemas/user.schema';
import { SessionController } from './controllers/session.controller';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';
import { UserRepository } from './dal/repositories/user.repository';
import { CoffeeService } from './services/coffee.service';
import { CoffeeRepository } from './dal/repositories/coffee.repository';
import { Coffee, CoffeeSchema } from './dal/schemas/coffee.schema';
import { CoffeeTypeSchema, CoffeeType } from './dal/schemas/coffee-type.schema';
import { CoffeeController } from './controllers/coffee.controller';
import { UserController } from './controllers/user.controller';

const services = [
  SessionService, 
  UserService, 
  CoffeeService,
];
const repositories = [
  UserRepository,
  CoffeeRepository,
];

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/coffee-track', mongooseOptions),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Coffee.name, schema: CoffeeSchema }, 
      { name: CoffeeType.name, schema: CoffeeTypeSchema },
    ])
  ],
  controllers: [ AppController, SessionController, CoffeeController, UserController ],
  providers: [
    ...services, 
    ...repositories
  ],
})
export class AppModule {}
