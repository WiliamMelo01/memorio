
interface IPlayerConnectStateProps {
    player?: string;
    color: string
    me?: boolean
    ready: boolean
}

export default function PlayerConnectState({ color, player, me = false, ready = false }: IPlayerConnectStateProps) {

    return (
        <div className={`flex border-[2.5px] border-[#CCC] rounded-md w-2/3 h-10 items-center justify-between px-4`}>
            <span className="text-xl font-semibold text-primary-100">{me ? "EU" : player ?? "Player 1"}</span>
            <span className={`text-xl font-semibold ${ready ? color : 'text-[#CCC]'}`}>{ready ? "PRONTO" : "ESPERANDO"}</span>
        </div>

    )
}