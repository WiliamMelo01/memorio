'use client'

import { MdLock, MdPublic } from 'react-icons/md'

interface IButtonProps {
    text: string
    onClick: () => void
    privateRoom?: boolean
    noIcon?: boolean
    outline?: boolean
}

export default function Button({ onClick = () => { }, text = "", privateRoom = false, noIcon = false, outline = false }: IButtonProps) {
    return (
        <button className={`${outline ? 'bg-transparent' : 'bg-yellow-100'} w-1/2 h-12 rounded-full ${outline ? 'text-yellow-100' : 'text-white-100'} ${outline && 'border-2 border-yellow-100'} font-bold text-xl  ${outline ? 'hover:border-yellow-200 hover:border-[3px] text-yellow-200' : 'hover:bg-yellow-200'} transition-colors duration-300 flex items-center justify-center gap-1 mt-4 max-sm:w-2/3`} onClick={onClick}>
            {
                !noIcon && <span>
                    {privateRoom ? <MdLock /> : <MdPublic />}
                </span>
            }
            <span>
                {text}
            </span>
        </button>
    )
}
