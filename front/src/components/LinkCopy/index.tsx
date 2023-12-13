import Image from 'next/image';
import { useRef, useState } from "react";

interface ILinkCopyProps {

}

export default function LinkCopy({ }: ILinkCopyProps) {

    const [isCopied, setIsCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const inpuRef = useRef<HTMLInputElement>(null);
    const tooltipRef = useRef<HTMLInputElement>(null);

    function copyLink() {
        setIsCopied(true);
        setShowTooltip(true);

        // Select the text field
        inpuRef.current?.select();
        inpuRef.current?.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(inpuRef.current?.value as string);

        setTimeout(() => {
           setShowTooltip(false);
        }, 2500);
    }

    return (
        <div className="flex w-full h-auto relative">
            <input ref={inpuRef} type="text" disabled className="w-full h-12 rounded-md border border-yellow-100 pl-2 text-lg" value="localhost:3000/AJ8Ah" />
            <button title="Copiar link" className="absolute w-auto h-full right-3 top-0 flex items-center justify-center" onClick={copyLink}>
                <Image src={isCopied ? '/copied.png' : '/copy.png'} width={35} height={35} alt="Copy icon" />
            </button>

            <span ref={tooltipRef} className={`absolute -bottom-12 text-white-100 right-1 bg-primary-100 p-2 rounded-md animate-show-copy ${showTooltip ? 'visible' : 'invisible'}`}>Link copiado.</span>

        </div>
    )
}