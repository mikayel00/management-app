import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { EXCLUDED_FIELDS } from '../constants';
import { UserResponse } from '../responses/user-response';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).exec();
  }
  async createUser(data: UserCreateDto): Promise<UserCreateDto> {
    data.password = await this.hashPassword(data.password);
    const createdUser = new this.userModel(data);
    await createdUser.save();
    return data;
  }

  async publicUser(email: string) {
    return await this.userModel
      .findOne({ email: email })
      .populate({ path: 'tickets', select: EXCLUDED_FIELDS })
      .select(EXCLUDED_FIELDS)
      .exec();
  }

  async updateUser(email: string, dto: UserUpdateDto): Promise<UserUpdateDto> {
    return this.userModel
      .findOneAndUpdate({ email: email }, dto)
      .select(EXCLUDED_FIELDS);
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.userModel
      .findOneAndDelete({ email: email })
      .select(EXCLUDED_FIELDS);
    return true;
  }

  async getAllUsers(): Promise<UserResponse[]> {
    return this.userModel
      .find()
      .populate('tickets')
      .select(EXCLUDED_FIELDS)
      .exec();
  }
}
