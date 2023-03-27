import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserCreateDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).exec();
  }
  async createUser(data: UserCreateDto): Promise<User> {
    data.password = await this.hashPassword(data.password);
    const createdUser = new this.userModel(data);
    await createdUser.save();
    return data;
  }

  async publicUser(email: string) {
    return await this.userModel
      .findOne({ email: email })
      .select(['-password'])
      .exec();
  }
}
