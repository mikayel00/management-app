import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateDto } from '../users/dtos/user-create.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({
    type: UserCreateDto,
    description: 'Register user',
  })
  @Post('/register')
  register(@Body() data: UserCreateDto): Promise<UserCreateDto> {
    return this.authService.registerUsers(data);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    type: UserCreateDto,
    description: 'Login user',
  })
  @Post('/login')
  login(@Body() data: UserLoginDto): Promise<UserCreateDto> {
    return this.authService.loginUser(data);
  }
}
