'use client'

import Card from "@/components/card";
import PlayerScore from "@/components/playerScore";
import { startGameContext } from "@/contexts/startGame";
import UserDataProvider from "@/contexts/userData";
import { WinData } from "@/interfaces/winData";
import { useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import Button from "../button";
import GameEndMessage from "../gameEndMessage";

interface IGameProps {
    client: Socket
}

export function Game({ client }: IGameProps) {
    const { startGameData } = useContext(startGameContext);

    const { cards, players, playingRoom, whoPlays } = startGameData;

    function initializeUsersScore() {
        return players.reduce((acc, item) => {
            acc.set(item.id, 0);
            return acc;
        }, new Map<string, number>());
    }

    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [usersFlippedCards, setUsersFlippedCards] = useState<number[]>([]);
    const [asserts, setAsserts] = useState<number[]>([]);
    const [usersScore, setUsersScore] = useState(initializeUsersScore);
    const [currentPlayer, setCurrentPlayer] = useState<string>("");
    const [winData, setWinData] = useState<WinData>({ leaderboard: [], winner: '' });



    useEffect(() => {
        setCurrentPlayer(whoPlays);
    }, []);

    const correctAnswer = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio("/sounds/correct_answer.mp3") : undefined
    );

    const wrongAnswer = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio("/sounds/wrong_answer.mp3") : undefined
    );

    useEffect(() => {
        if (flippedCards.length === 2) {
            if (cards[flippedCards[0]].name === cards[flippedCards[1]].name) {
                correctAnswer.current?.play();
                setAsserts([...asserts, ...flippedCards]);
                resetFlippedCards();
                client.emit("assert", {
                    cards: [flippedCards[0], flippedCards[1]],
                    room: playingRoom
                });
                return;
            }

            client.emit('wrongPair', {
                room: playingRoom
            });

            wrongAnswer.current?.play();
            setTimeout(() => {
                resetFlippedCards();
            }, 1000);

        }

    }, [flippedCards, asserts]);

    const handleCardClick = (cardId: number, index: number) => {

        client.emit("cardFlipped", { card: index, room: playingRoom });

        if (flippedCards.length < 2) {
            setFlippedCards(prev => [...prev, index]);
        }
    };

    const resetFlippedCards = () => {
        setFlippedCards([]);
    };

    client.on('flipCard', ({ cardIndex, whoFlipped }: { whoFlipped: string, cardIndex: number }) => {

        if (whoFlipped !== client.id) {
            setUsersFlippedCards([...usersFlippedCards, cardIndex]);

        }
    });

    useEffect(() => {
        if (usersFlippedCards.length === 2) {
            setTimeout(() => {
                setUsersFlippedCards([]);
            }, 1000);
        }
    }, [usersFlippedCards]);

    client.on("userAsserts", ({ cards, userScore, whoAsserts }: { whoAsserts: string, userScore: number, cards: number[] }) => {
        setUsersScore(prevState => {
            const newUsersScore = new Map(prevState);
            newUsersScore.set(whoAsserts, userScore);
            return newUsersScore;
        });

        setAsserts([...asserts, ...cards]);
    });

    function getUserNameById(id: string) {
        return players.find(player => player.id === id)?.name as string;
    }


    client.on('newCurrentPlayer', ({ currentPlayer }: { currentPlayer: string }) => {
        setCurrentPlayer(currentPlayer);
    })

    client.on("gameOver", (data: WinData) => {
        setWinData(data);
    });

    return (
        <main className="flex min-h-screen items-center justify-center bg-dark flex-col ">

            <h1 className="absolute top-[5%] left-[10%] text-3xl text-white-100 font-bold">Memório</h1>

            <span className="text-white-100 w-full text-center font-bold text-3xl absolute top-[5%] left-[50%] right-[50%] -translate-x-[50%]">{currentPlayer !== client.id ? `${players.find(player => player.id === currentPlayer)?.name} ESTA JOGANDO` : "MINHA VEZ"}</span>

            <div className="w-full h-auto bg-transparent rounded-sm absolute bottom-[5%] right-[50%] left-[50%] -translate-x-[50%] flex  items-center justify-center gap-8">

                {
                    Array.from(usersScore.entries()).map(([id, score], index) => <PlayerScore active={currentPlayer === id} name={getUserNameById(id)} color={players[index].color} score={score ?? 0} key={id} />)
                }

            </div>

            <div className="grid grid-cols-8 gap-4 h-auto absolute top-[50%] -translate-y-[50%]">
                {
                    cards.map(({ id, image }, index) => {
                        return <Card isDisabled={currentPlayer !== client.id} image={image} isFlipped={flippedCards.includes(index) || asserts.includes(index) || usersFlippedCards.includes(index)} onClick={() => handleCardClick(id, index)} key={id} />
                    })
                }

                {winData.leaderboard.length > 0 &&
                    <div className="shadow-3xl  rounded-3xl absolute top-[50%] bottom-[50%] left-[50%] right-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#fafafa] z-50 py-6 grid place-items-center sm:-translate-y-[50%] sm:w-full border-2 border-gray-300 sm:h-[250%] xl:w-[80%] xl:h-[250%]">

                        <GameEndMessage win={winData.winner === client.id} />

                        <div className="w-[75%] flex flex-col gap-4 items-center">
                            {winData.leaderboard.sort((a, b) => b.score - a.score).map((score, index) => {
                                return <PlayerScore showTriangle={false} active={true} color={score.user.color} name={score.user.name} score={score.score} key={index} />
                            })}
                        </div>

                        <Button onClick={() => { }} text="Jogar novamente" noIcon />
                        <Button onClick={() => { }} text="Voltar ao menu" outline noIcon />

                    </div>
                }

            </div>

        </main >
    )

}


export default function GamePageProvider({ client }: IGameProps) {
    return <UserDataProvider>
        <Game client={client} />
    </UserDataProvider>
}