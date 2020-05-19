import { Injectable } from '@nestjs/common';
import { User } from 'src/dal/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    const user = await users.find(x => true).populate('role').execPopulate();
    console.log(user.role);
    return users;
  }
}
