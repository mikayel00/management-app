import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ticket } from '../../tickets/schemas/ticket.schema';

export type UserDocument = User & mongoose.Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  secondName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }] })
  tickets: Ticket[];

  @Prop()
  userId: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
