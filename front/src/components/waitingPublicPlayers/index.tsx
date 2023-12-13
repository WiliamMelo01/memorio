import ClipLoader from "react-spinners/ClipLoader";
import Button from "../button";

interface IWaitingPublicPlayersProps {
  onCancel: () => void
}

export default function WaitingPublicPlayers({ onCancel }: IWaitingPublicPlayersProps) {
  return (
    <>
      <p className="text-primary-100 text-xl font-semibold ">Esperando outros jogadores...</p>
      <ClipLoader
        color={"blue"}
        loading={true}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      <Button onClick={onCancel} text="Cancel" noIcon />

    </>
  )
}
