import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { QueueService } from './services/queue.service';
import { WebSocket } from './websocket/Websocket';

@Module({
  imports: [],
  providers: [WebSocket, QueueService, GameService],
})
export class AppModule {}
