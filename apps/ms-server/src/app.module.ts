import { Module } from '@nestjs/common';

import { DbModule } from './db/db.module';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { SentimentsModule } from './sentiments/sentiments.module';
import { StatisticsModule } from './statistics/statistics.module';
import { MessagesModule } from './messages/messages.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    DbModule,
    ChatModule,
    UsersModule,
    SentimentsModule,
    StatisticsModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
