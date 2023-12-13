
interface IindexProps {
    active?: boolean
    name: string
    score: number
    color: 'RED' | 'BLUE' | 'CYAN' | 'GREEN'
    showTriangle? : boolean
}   

export default function PlayerScore({ active = false, name = "", score = 0, color, showTriangle = true }: IindexProps) {

    const borderStyle = {
        BLUE: "border-4 border-blue-500",
        CYAN: "border-4 border-cyan-500",
        GREEN: "border-4 border-green-500",
        RED: "border-4 border-red-500",
    }

    const triangleStyle = {
        BLUE: "border-t-blue-500 border-l-blue-500",
        CYAN: "border-t-cyan-500 border-l-cyan-500",
        GREEN: "border-t-green-50 border-l-green-500",
        RED: "border-t-red-500 border-l-red-500",
    }

    return (
        <div className={`flex ${active && borderStyle[color]} bg-white-100 rounded-md w-auto h-20 items-center justify-between gap-28 px-5 relative sm:h-14 sm:w-64`}>
            <span className="text-xl font-semibold text-primary-100 sm:text-lg">{name}</span>
            <span className="text-2xl font-bold text-primary-100">{score}</span>

            {
                showTriangle && active && <div className={`absolute w-[0] h-[0] border-[12px] border-transparent ${triangleStyle[color]} -top-[14%] left-[50%]
                right-[50%] -translate-x-[50%] rotate-45`}></div>
            }

        </div>
    )
}