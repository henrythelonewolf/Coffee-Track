import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "src/dal/schemas/user.schema";
import { SessionController } from "./session.controller";
import { SessionService } from "./session.service";
import { Role, RoleSchema } from "src/dal/schemas/role.schema";
import { UserRepository } from "src/dal/repositories/user.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  controllers: [SessionController],
  providers: [SessionService, UserRepository],
})
export class SessionModule {}