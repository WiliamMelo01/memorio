import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { colors } from 'src/data/colors';
import { Card } from 'src/entities/card';
import { Player } from 'src/entities/player';
import { images } from '../data/images';
import { QueueService } from './queue.service';

@Injectable()
export class GameService {
  constructor(
    @Inject(QueueService) private readonly _queueService: QueueService,
  ) {}

  private MAX_PLAYERS_PER_GAME = 4;
  private MAX_ASSERTS_PER_GAME = images.length;

  private currentPlayer = new Map<string, number>();
  private playerAsserts = new Map<string, number>();
  private gameAssertsCount = new Map<string, number>();
  private names = new Map<string, string>();

  handleJoinPublicGame(client: Socket, server: Server, name?: string) {
    this._queueService.add(client.id, name);
    client.join('waiting');

    const hasEnoughPlayers =
      this._queueService.getLenght() === this.MAX_PLAYERS_PER_GAME;

    if (hasEnoughPlayers) {
      const shuffledCards = this.getShuffledCards();

      const players = this._queueService.getPlayers(this.MAX_PLAYERS_PER_GAME);

      this.saveUsersNames(players);

      const randomRoomName = this.generateRandomId();

      //CHOOSE WHO WILL PLAY FIRST
      this.currentPlayer.set(randomRoomName, 0);

      const startGameData = {
        players: this.getPlayersData(players),
        playingRoom: randomRoomName,
        cards: shuffledCards,
        whoPlays: players[0].id,
      };

      server.emit('start', startGameData);

      const playersSockets = this.getPlayersSockets(players, server);

      this.joinMultiplePlayersInSpecificRoom(randomRoomName, playersSockets);
    }
  }

  handleCardFlipped(
    client: Socket,
    { card, room }: { card: number; room: string },
    server: Server,
  ) {
    const flippedCardData = {
      whoFlipped: client.id,
      cardIndex: card,
    };

    server.to(room).emit('flipCard', flippedCardData);
  }

  handleAssert(
    client: Socket,
    { cards, room }: { cards: number[]; room: string },
    server: Server,
  ) {
    const userScore: number | undefined = this.playerAsserts.get(client.id);
    const newScore = userScore !== undefined ? Number(userScore) + 1 : 1;
    // UPDATE USER SCORE
    this.playerAsserts.set(client.id, newScore);

    const gameAssertsCount = this.gameAssertsCount.get(room);
    const newGameAssertsCount = gameAssertsCount + 1;
    this.gameAssertsCount.set(room, gameAssertsCount ? newGameAssertsCount : 1);

    const isGameOver = newGameAssertsCount === this.MAX_ASSERTS_PER_GAME;

    if (isGameOver) {
      const players = Array.from(server.sockets.adapter.rooms.get(room));

      // SCORE OF EACH PLAYER
      const playersScore = players.map((user) => {
        return this.playerAsserts.get(user) ?? 0;
      });

      // NAME OF EACH PLAYER
      const playersNames = players.map((user) => {
        return this.names.get(user);
      });

      const maxScore = Math.max(...playersScore);
      const winnerIndex = playersScore.indexOf(maxScore);
      const winnerID = players[winnerIndex];

      const leaderboard = playersScore.map((score, index) => ({
        score,
        user: {
          id: players[index],
          name: playersNames[index],
          color: colors[index],
        },
      }));

      const gameOverData = {
        winner: winnerID,
        leaderboard: leaderboard,
      };
      server.to(room).emit('gameOver', gameOverData);
    }

    const assertData = {
      whoAsserts: client.id,
      userScore: newScore,
      cards,
    };

    server.to(room).emit('userAsserts', assertData);
  }

  handleWrongPair({ room }: { room: string }, server: Server) {
    const playerWhowIsPlaying: number = this.currentPlayer.get(room);
    const isLastPlayer = playerWhowIsPlaying === this.MAX_PLAYERS_PER_GAME - 1;
    const newCurrentPlayer = isLastPlayer ? 0 : playerWhowIsPlaying + 1;
    this.currentPlayer.set(room, newCurrentPlayer);

    const players = Array.from(
      server.sockets.adapter.rooms.get(room).entries(),
    );

    server.to(room).emit('newCurrentPlayer', {
      currentPlayer: players[newCurrentPlayer][0],
    });
  }

  private generateRandomId() {
    const randomId =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    return randomId;
  }

  private saveUsersNames(players: Player[]) {
    players.forEach((player) => {
      this.names.set(player.id, player.name);
    });
  }

  private getShuffledCards() {
    const shuffledCards = [...images, ...images]
      .map((image, index) => new Card(index, image, image))
      .sort(() => Math.random() - 0.5);
    return shuffledCards;
  }

  private getPlayersData(players: Player[]) {
    const playersData = players.map((playerData, index) => ({
      ...playerData,
      color: colors[index],
    }));
    return playersData;
  }

  private getPlayersSockets(players: Player[], server: Server): Socket[] {
    const playersSockets: Socket[] = players.map((player) => {
      return server.sockets.sockets.get(player.id);
    });
    return playersSockets;
  }

  private joinMultiplePlayersInSpecificRoom(roomId: string, players: Socket[]) {
    players.forEach((socket) => {
      socket.join(roomId);
    });
  }
}
