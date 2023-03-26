import { IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  secondName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
