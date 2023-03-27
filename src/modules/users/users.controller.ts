import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from './schemas/user.schema';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Endpoints')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
