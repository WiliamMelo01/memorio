import { Inject, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { GameService } from 'src/services/game.service';
import { QueueService } from 'src/services/queue.service';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class WebSocket
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  private server: Server;
  private logger: Logger;

  constructor(
    @Inject(QueueService) private readonly _queueService: QueueService,
    @Inject(GameService) private readonly _gameService: GameService,
  ) {
    this.logger = new Logger();
  }

  afterInit(server: Server) {
    this.server = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log('USER DISCONNECTED - ID: ' + client.id);
    this._queueService.remove(client.id);
  }

  handleConnection(client: Socket) {
    this.logger.log('USER CONNECTEC - ID: ' + client.id);
  }

  @SubscribeMessage('joinPublicGame')
  handleJoinPublicGame(client: Socket, name?: string) {
    this._gameService.handleJoinPublicGame(client, this.server, name);
  }

  @SubscribeMessage('cardFlipped')
  handleCardFlipped(client: Socket, data: { card: number; room: string }) {
    this._gameService.handleCardFlipped(client, data, this.server);
  }

  @SubscribeMessage('assert')
  handleAssert(client: Socket, data: { cards: number[]; room: string }) {
    this._gameService.handleAssert(client, data, this.server);
  }

  @SubscribeMessage('wrongPair')
  handleWrongPair(client: Socket, data: { room: string }) {
    this._gameService.handleWrongPair(data, this.server);
  }
}
