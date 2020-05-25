import { Controller, Post, Body, Header } from '@nestjs/common';
import { CreateUserRequest } from 'src/dto/user/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/dal/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/dal/schemas/role.schema';

@Controller('user')
export class UserController {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>
  ) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async createUser(@Body() request: CreateUserRequest): Promise<any> {
    // const roles = await this.roleModel.find({});
    // console.log(roles);
    // const role = await this.roleModel.findOne({roleDescription: 'user'});
    // var hash = await bcrypt.hash(request.user.password, 10);
    // var user = new this.userModel({
    //   password: hash,
    //   email: request.user.email,
    //   role: role._id
    // });
    // user.save();
    // return user;
  }
}
