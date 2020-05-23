import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findUserByEmail(email: string): Promise<User>{
    var user = await this.userModel.findOne({email: email}).exec();
    if (typeof user !== 'undefined') {
      user = await user.populate('role').execPopulate();
    }
    
    return user;
  }
}