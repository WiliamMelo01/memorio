import { Card } from "./card";
import { IPlayer } from "./player";

export interface IStartGameData {
    cards : Card[]
    playingRoom: string
    players: IPlayer[]
    whoPlays: string
}