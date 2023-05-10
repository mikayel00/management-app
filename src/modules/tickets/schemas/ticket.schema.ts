import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import { TicketStages } from '../enums';

export type TicketDocument = Ticket & mongoose.Document;
@Schema({ timestamps: true })
export class Ticket {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  stage: TicketStages;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop()
  ticketId: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
