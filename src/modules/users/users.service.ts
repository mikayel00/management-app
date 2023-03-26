import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserCreateDto } from './dtos/user-create.dto';
import { USER_ERROR } from '../common/exceptions/exceptions';

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
    const existUser = await this.findUserByEmail(data.email);

    if (existUser) {
      throw new BadRequestException(USER_ERROR.USER_EXISTS);
    }

    data.password = await this.hashPassword(data.password);
    const createdUser = new this.userModel(data);
    await createdUser.save();
    return data;
  }
}
