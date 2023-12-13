import LinkCopy from "../LinkCopy";
import Button from "../button";
import PlayerConnectState from "../playerConnectionState";

interface ICreatePrivateGameProps {
    onCancel: () => void,
    onStartClick: () => void,
}

export default function CreatePrivateGame({ onCancel , onStartClick}: ICreatePrivateGameProps) {
    return (
        <div className="flex w-full h-full flex-col items-center justify-center ">
            <p className="text-primary-100 text-2xl  font-semibold"> Criar partida privada </p>

            <div className="flex flex-row w-full h-full pt-10">
                <div className="w-1/2 h-72 flex flex-col items-start justify-center gap-3">

                    <PlayerConnectState color="text-[#0F0]" me ready />
                    <PlayerConnectState color="text-[#0FF]" ready />
                    <PlayerConnectState color="text-[#F00]" ready />
                    <PlayerConnectState color="text-[#00F]" ready />

                </div>

                <div className="w-1/2 h-72 flex items-center justify-center flex-col">
                    <p className="text-primary-100 font-semibold text-center mb-10">Compartilhe este link com os seus amigos para que eles possam se juntar a você.</p>

                    <LinkCopy />

                </div>
            </div>

            <Button onClick={onStartClick} text="Começar" noIcon />

            <Button onClick={onCancel} text="Cancel" noIcon outline />
        </div>

    )
}