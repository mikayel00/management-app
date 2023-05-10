import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    description: "User's name",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "User's second name",
  })
  @IsString()
  secondName: string;

  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "User's email",
  })
  @IsEmail()
  @IsString()
  email: string;
}
