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
import { User } from './schemas/user.schema';
import { TicketCreateDto } from '../tickets/dtos/ticket-create.dto';

@ApiTags('Users Endpoints')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all tickets' })
  @ApiOkResponse({
    type: TicketCreateDto,
    description: 'Get all tickets',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
  @ApiOperation({ summary: 'User update' })
  @ApiOkResponse({
    type: UserUpdateDto,
    description: 'User update',
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() data: UserUpdateDto,
    @Req() request,
  ): Promise<UserUpdateDto> {
    const user = request.user;
    console.log(user);
    return this.usersService.updateUser(user.email, data);
  }

  @ApiOperation({ summary: 'User delete' })
  @ApiNoContentResponse({
    type: UserUpdateDto,
    description: 'User delete',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<User> {
    const user = request.user;
    return this.usersService.deleteUser(user.email);
  }
}
