import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TicketStages } from '../../tickets/enums';

class UserTicketsResponse {
  @ApiProperty({
    description: "Ticket's title",
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Ticket's description",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Ticket's stage",
  })
  @IsString()
  @IsEnum(TicketStages)
  stage: string;

  @ApiProperty({
    description: 'Ticket ID',
  })
  @IsNumber()
  ticketId: number;
}

class AuthUserResponse {
  @ApiProperty({
    description: 'User first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User second name',
  })
  @IsString()
  secondName: string;

  @ApiProperty({
    description: 'User username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User tickets',
  })
  @IsString()
  tickets: UserTicketsResponse[];
}

export class AuthResponse {
  @ApiProperty({
    description: 'Auth user',
  })
  user: AuthUserResponse;

  @ApiProperty({
    description: 'Auth token',
  })
  @IsString()
  token: string;
}
