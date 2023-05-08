import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { TicketCreateDto } from '../dtos/ticket-create.dto';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { EXCLUDED_FIELDS } from '../../users/constants';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createTicket(email: string, data: TicketCreateDto): Promise<Ticket> {
    const user = await this.userModel
      .findOne({ email: email })
      .select(EXCLUDED_FIELDS)
      .exec();

    const ticket = {
      createdBy: user,
      ...data,
    };
    const createdTicket = new this.ticketModel(ticket);
    await this.userModel.findOneAndUpdate(
      { email: email },
      {
        $push: { tickets: createdTicket },
      },
    );

    return await createdTicket.save();
  }

  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketModel
      .find()
      .populate({ path: 'createdBy', select: EXCLUDED_FIELDS })
      .exec();
  }

  async updateTicket(id: string) {
    return;
  }

  async deleteTicket(email: string, ticketId: string) {
    const ticket = await this.ticketModel.findById(ticketId);
    console.log(ticket);
    await this.userModel.findOneAndUpdate(
      { email: email },
      {
        $pull: { tickets: ticketId },
      },
    );
    return this.ticketModel.findByIdAndDelete(ticketId);
  }
}
