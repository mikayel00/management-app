import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { TicketCreateDto } from '../dtos/ticket-create.dto';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { EXCLUDED_FIELDS } from '../../users/constants';
import { IdService } from '../../global/id/id.service';
import { TicketResponse } from '../responses/ticket-response';
import { TICKET_ERROR } from '../../common/exceptions/constants';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly idService: IdService,
  ) {}
  async createTicket(
    email: string,
    data: TicketCreateDto,
  ): Promise<TicketResponse> {
    const user = await this.userModel
      .findOne({ email: email })
      .select(EXCLUDED_FIELDS)
      .exec();

    const ticket = {
      createdBy: user,
      ...data,
      ticketId: await this.generateAndCheckId(),
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

  async getAllTickets(): Promise<TicketResponse[]> {
    return this.ticketModel
      .find()
      .populate({ path: 'createdBy', select: EXCLUDED_FIELDS })
      .exec();
  }

  // async updateTicket(id: string) {
  //   return;
  // }

  async deleteTicket(email: string, ticketId: number): Promise<boolean> {
    const ticket = await this.ticketModel.findOneAndDelete({
      ticketId: ticketId,
    });
    if (!ticket) {
      throw new NotFoundException(TICKET_ERROR.TICKET_NOT_EXISTS);
    }
    await this.userModel.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          tickets: ticket._id,
        },
      },
    );
    return true;
  }

  private async generateAndCheckId(): Promise<number> {
    let generatedId = await this.idService.generateId();
    while (await this.ticketModel.findOne({ id: generatedId })) {
      generatedId = await this.idService.generateId();
    }
    return generatedId;
  }
}
