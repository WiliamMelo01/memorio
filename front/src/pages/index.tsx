'use client'

import ChooseMode from "@/components/chooseMode";
import CreatePrivateGame from "@/components/createPrivateGame";
import Game from "@/components/game";
import WaitingPlayers from "@/components/waitingPublicPlayers";
import StartGameProvider from "@/contexts/startGame";
import UserDataProvider from "@/contexts/userData";
import { useUserData } from "@/hooks/useUserData";
import { IStartGameData } from "@/interfaces/startGameData";
import React, { useState } from "react";
import { Socket, io } from "socket.io-client";
import useStartGameData from '../hooks/useStartGameData';

export function HomePage() {

  // STATES
  const [isWaitingPublicPlayers, setIsWaitingPublicPlayers] = useState<boolean>(false);
  const [isCreatingPrivateGame, setIsCreatingPrivateGame] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [socketClient, setSocketClient] = useState<Socket | null>(null);
  // CUSTOM CONTEXTS
  const { setStartGameData } = useStartGameData();
  const { userName } = useUserData();

  function fetchPublicGame() {
    setIsWaitingPublicPlayers(true);

    const client = io("http://localhost:3002");
    
    client.on('connect', () => {
      setSocketClient(client);
      client.emit("joinPublicGame", userName);
    });

    client.on('start', (data: IStartGameData) => {
      setStartGameData(data);
      setIsPlaying(true);
    });
  }

  function fetchPrivateGame() {
    setIsCreatingPrivateGame(true);
  }

  function onFetchingCancel() {
    socketClient?.disconnect();
    setIsWaitingPublicPlayers(false);
  }

  function onCreatingCancel() {
    setIsCreatingPrivateGame(false);
  }

  function onStartPrivate() {
  }

  function showContent() {
    if (isWaitingPublicPlayers) {
      return <WaitingPlayers onCancel={onFetchingCancel} />;
    } else if (isCreatingPrivateGame) {
      return <CreatePrivateGame onStartClick={onStartPrivate} onCancel={onCreatingCancel} />;
    }
    return <ChooseMode onPublicClick={fetchPublicGame} onPrivateClick={fetchPrivateGame} />;

  }

  return (
    <React.Fragment>
      {
        isPlaying ? <Game client={socketClient as Socket} /> : <main className="flex min-h-screen h-full w-full items-center justify-center bg-dark flex-col">
          <h1 className="text-white-100 text-3xl max-max-sm:absolute max-max-sm:top-1">Memório</h1>

          <div className="w-[40%] bg-white-100 mt-[2%] flex flex-col items-center justify-center gap-3 rounded-xl px-[1%] py-[2%] max-sm:gap-1">

            {
              showContent()
            }

          </div>
        </main>
      }
    </React.Fragment>
  )
}

export default function HomeWithProviders() {
  return <UserDataProvider>
    <StartGameProvider>
      <HomePage />
    </StartGameProvider>
  </UserDataProvider>
}