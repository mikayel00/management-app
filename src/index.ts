import { TicketModule } from './ticket/ticket.module';
import configs from './config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    TicketModule,
  ],
})
export default class AppModule {}
