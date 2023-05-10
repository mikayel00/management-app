import { Module } from '@nestjs/common';
import { TicketsService } from './services/tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../users/schemas/user.schema';
import { IdService } from '../global/id/id.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, IdService],
  exports: [TicketsService],
})
export class TicketsModule {}
