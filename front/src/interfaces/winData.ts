export interface WinData {
    winner: string
    leaderboard : LeaderBoard[]
}

export interface LeaderBoard {
    score: number
    user: {
        id: string
        name: string
        color: "RED" | "BLUE" | "CYAN" | "GREEN"
    }
}