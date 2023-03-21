import { TicketModule } from '../modules/ticket/ticket.module';
import configs from './config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    TicketModule,
    UsersModule,
  ],
})
export default class AppModule {}
