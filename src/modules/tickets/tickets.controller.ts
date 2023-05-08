import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './services/tickets.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TicketCreateDto } from './dtos/ticket-create.dto';
import { JwtAuthGuard } from '../common/guards/jwt-guard';
import { Ticket } from './schemas/ticket.schema';
import { AuthService } from "../auth/auth.service";

@ApiTags('Tickets Endpoints')
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketService: TicketsService,
  ) {}

  @ApiOperation({ summary: 'Create a ticket' })
  @ApiCreatedResponse({
    type: TicketCreateDto,
    description: 'Create a ticket',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createTicket(@Body() data: TicketCreateDto, @Req() request): Promise<Ticket> {
    const { user } = request;
    return this.ticketService.createTicket(user.email, data);
  }

  @ApiOperation({ summary: 'Get all tickets' })
  @ApiOkResponse({
    type: TicketCreateDto,
    description: 'Get all tickets',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getAllTickets();
  }

  // @ApiOperation({ summary: 'Update ticket' })
  // @ApiOkResponse({
  //   type: TicketCreateDto,
  //   description: 'Update ticket',
  // })
  // @Patch()
  // updateTicket(@Query('id') id: string) {
  //   return this.ticketService.updateTicket(id);
  // }

  @ApiOperation({ summary: 'Delete ticket' })
  @ApiOkResponse({
    type: TicketCreateDto,
    description: 'Delete ticket',
  })
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteTicket(@Query('id') ticketId, @Req() request) {
    const { user } = request;
    return this.ticketService.deleteTicket(user.email, ticketId);
  }
}
