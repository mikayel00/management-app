import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { TicketStages } from '../enums';

class CreatedByResponse {
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
}

export class TicketResponse {
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
    description: "Ticket's creator",
  })
  @IsNumber()
  createdBy: CreatedByResponse;

  @ApiProperty({
    description: 'Ticket ID',
  })
  @IsNumber()
  ticketId: number;
}
