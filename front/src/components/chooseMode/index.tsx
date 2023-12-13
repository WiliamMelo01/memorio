import Button from "../button";
import Input from "../input";

interface IChooseModeProps {
    onPublicClick: () => void;
    onPrivateClick: () => void
}

export default function ChooseMode({ onPublicClick, onPrivateClick }: IChooseModeProps) {
    return (
        <>
            <p className="text-xl text-primary-100 font-semibold mb-5 text-center max-w-2xl max-sm:text-md max-sm:mb-2">Treine seu cérebro! Jogue este jogo todos os dias. Mantenha seu cérebro em forma!</p>

            <Input />

            <Button onClick={onPublicClick} text="Partida pública" />

            <Button onClick={onPrivateClick} text="Partida privada" privateRoom />
        </>
    )
}
