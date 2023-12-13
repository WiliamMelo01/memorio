
interface IGameEndMessageProps {
    win?: boolean
}

export default function GameEndMessage({ win = false }: IGameEndMessageProps) {

    const styles = new Map();

    styles.set(true, "text-green-500");
    styles.set(false, "text-red-500");

    return (
        <p className="text-[45px] text-primary-100 text-center font-bold sm:text-[35px]">Você <span className={`${styles.get(win)}`}>{win ?  "GANHOU" : "PERDEU"}</span></p>
    )
}