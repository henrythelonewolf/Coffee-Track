import { Body, Controller, Header, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '@schemas/role.schema';
import { User } from '@schemas/user.schema';
import { CreateUserRequest } from '@dto/user/user.dto';

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
