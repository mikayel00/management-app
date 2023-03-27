import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tickets Endpoints')
@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Get()
  getTickets(): string {
    return this.ticketService.getAllTickets();
  }
}
