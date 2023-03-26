import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from './schemas/user.schema';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  createUsers(@Body() data: UserCreateDto): Promise<User> {
    return this.userService.createUser(data);
  }
}
