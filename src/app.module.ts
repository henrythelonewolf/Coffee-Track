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
import { ProviderController } from './controllers/provider.controller';
import { ProviderRepository } from '@repositories/provider.repository';
import { ProviderService } from '@services/provider.service';
import { CoffeeProvider, CoffeeProviderSchema } from '@schemas/provider.schema';
import { BrewService } from '@services/brew.service';
import { BrewRepository } from '@repositories/brew.repository';
import { Brew, BrewSchema } from '@schemas/brew.schema';
import { BrewController } from './controllers/brew.controller';

const services = [
  SessionService, 
  UserService, 
  CoffeeService,
  ProviderService,
  BrewService
];

const repositories = [
  UserRepository,
  CoffeeRepository,
  ProviderRepository,
  BrewRepository
];

const controllers = [ 
  AppController, 
  SessionController, 
  CoffeeController, 
  UserController, 
  ProviderController, 
  BrewController 
]

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
      { name: CoffeeProvider.name, schema: CoffeeProviderSchema },
      { name: Brew.name, schema: BrewSchema}
    ])
  ],
  controllers: controllers,
  providers: [
    ...services, 
    ...repositories
  ],
})
export class AppModule {}
