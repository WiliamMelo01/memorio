import { ReactNode, createContext, useState } from "react";
import { IStartGameData } from "../interfaces/startGameData";

export interface IStartGameContext {
    startGameData: IStartGameData
    setStartGameData: (data: IStartGameData) => void
}

export const startGameContext = createContext<IStartGameContext>({
    startGameData: {
        cards: [],
        players: [],
        playingRoom: '',
        whoPlays: ''
    },
    setStartGameData: () => { }
});

export default function StartGameProvider({ children }: { children: ReactNode }) {

    const [startGameData, setStartGameData] = useState<IStartGameData>({ cards: [], players: [], playingRoom: '', whoPlays: '' });

    return <startGameContext.Provider value={{ startGameData, setStartGameData }}>
        {children}
    </startGameContext.Provider>
}