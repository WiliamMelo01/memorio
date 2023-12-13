
import Image from "next/image";
import { useId } from "react";

interface ICardProps {
    image: string
    onClick : () => void
    isFlipped: boolean
    isDisabled: boolean
}

export default function Card({ image = "", onClick, isFlipped , isDisabled = true}: ICardProps) {

    return (
        <button disabled={isFlipped || isDisabled} onClick={onClick} className="bg-transparent sm:h-16 sm:w-16 md:h-24 md:w-24 rounded-full flex items-center justify-center perspective-1000 ">
            <div className={`flex-1 h-full transform-style-3d relative transition-transform duration-700 ${isFlipped ? "rotate-y-180" : "rotate-y-0"} `}>
                <div className="backface-hidden absolute bg-white-100 w-full h-full rounded-full"></div>
                <div className={`backface-hidden bg-white-200 flex items-center justify-center w-full h-full rounded-full absolute rotate-y-180`} id="back">
                    <Image src={`/${image}.png`} alt={useId()} width={70} height={70} />
                </div>
            </div>
        </button>
    )
}