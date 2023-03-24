import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Get()
  getTickets(): string {
    return this.ticketService.getAllTickets();
  }
}
