import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserUpdateDto } from './dtos/user-update.dto';
import { JwtAuthGuard } from '../guards/jwt-guard';

@ApiTags('Users Endpoints')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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
    return this.usersService.updateUser(user.email, data);
  }

  @ApiOperation({ summary: 'User delete' })
  @ApiOkResponse({
    type: UserUpdateDto,
    description: 'User update',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request) {
    const user = request.user;
    return this.usersService.deleteUser(user.email);
  }
}
