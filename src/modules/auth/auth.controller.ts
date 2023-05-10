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
import { AuthResponse } from './responses/user-login.response';
import { UserResponse } from "../users/responses/user-response";

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
  register(@Body() data: UserCreateDto): Promise<UserResponse> {
    return this.authService.registerUser(data);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({
    type: AuthResponse,
    description: 'Login user',
  })
  @Post('/login')
  login(@Body() data: UserLoginDto): Promise<AuthResponse> {
    return this.authService.loginUser(data);
  }
}
