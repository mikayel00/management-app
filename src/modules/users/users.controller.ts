import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './services/users.service';
import { UserUpdateDto } from './dtos/user-update.dto';
import { JwtAuthGuard } from '../common/guards/jwt-guard';
import { UserResponse } from './responses/user-response';

@ApiTags('Users Endpoints')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: [UserResponse],
    description: 'Get all users',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<UserResponse[]> {
    return this.usersService.getAllUsers();
  }
  @ApiOperation({ summary: 'User update' })
  @ApiOkResponse({
    type: UserUpdateDto,
    description: 'Update authorized user',
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() data: UserUpdateDto,
    @Req() request,
  ): Promise<UserUpdateDto> {
    const { user } = request;
    return this.usersService.updateUser(user.email, data);
  }

  @ApiOperation({ summary: 'User delete' })
  @ApiNoContentResponse({
    description: 'Delete authorized user',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const { user } = request;
    return this.usersService.deleteUser(user.email);
  }
}
