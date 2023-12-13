import { useContext } from "react";
import { startGameContext } from '../contexts/startGame';

export default function useStartGameData(){
    return useContext(startGameContext);
}