import { Injectable } from '@nestjs/common';
import { Player } from 'src/entities/player';

@Injectable()
export class QueueService {
  private queue: Player[] = [];

  add(id: string, name?: string) {
    this.queue = [
      ...this.queue,
      new Player(id, name ? name : `Jogador ${this.queue.length + 1}`),
    ];
    return this.queue;
  }

  remove(id: string) {
    const index = this.queue.findIndex((item) => item.id === id);
    this.queue.splice(index, 1);
    return this.queue;
  }

  getPlayers(numberOfPlayers: number) {
    const players = this.queue.slice(0, numberOfPlayers + 1);
    players.forEach((player) => this.remove(player.id));
    return players;
  }

  getLenght() {
    return this.queue.length;
  }
}
