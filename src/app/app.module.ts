import { TicketsModule } from '../modules/tickets/tickets.module';
import configs from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION_NAME } from './constants';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
      connectionName: MONGO_CONNECTION_NAME,
    }),
    TicketsModule,
    UsersModule,
  ],
})
export default class AppModule {}
