import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TicketStages } from '../enums';

export class TicketCreateDto {
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
}
