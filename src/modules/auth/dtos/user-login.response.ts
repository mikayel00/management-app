import { IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsString()
  token: string;
}
