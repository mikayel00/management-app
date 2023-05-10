import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { USER_ERROR } from '../common/exceptions/constants';
import { UserLoginDto } from './dtos/user-login.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from './responses/user-login.response';
import { TokenService } from '../token/token.service';
import { UserResponse } from '../users/responses/user-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(data: UserCreateDto): Promise<UserResponse> {
    const existUser = await this.usersService.findUserByEmail(data.email);

    if (existUser) throw new BadRequestException(USER_ERROR.USER_EXISTS);

    return this.usersService.createUser(data);
  }

  async loginUser(data: UserLoginDto): Promise<AuthResponse> {
    const existUser = await this.usersService.findUserByEmail(data.email);
    if (!existUser) throw new BadRequestException(USER_ERROR.USER_NOT_EXISTS);

    const validatePassword = await bcrypt.compare(
      data.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(USER_ERROR.WRONG_DATA);
    const user = await this.usersService.publicUser(data.email);
    const token = await this.tokenService.generateJwtToken(user);
    return { user, token };
  }
}
