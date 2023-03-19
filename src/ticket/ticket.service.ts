import { Injectable } from '@nestjs/common';
import * as process from 'process';

@Injectable()
export class TicketService {
  getAllTickets(): string {
    return process.env.MONGODB_USER || 'username';
  }
}
