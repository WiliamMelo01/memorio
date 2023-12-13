import { useUserData } from "../../hooks/useUserData";

interface IInputProps {

}

export default function Input({ }: IInputProps) {

    const {setUserName} = useUserData();

    return (
        <input type="text" placeholder="Escolha um nome" className="w-1/2 h-12 border-[2px] border-yellow-100 rounded-full px-3 focus:border-yellow-200 outline-none max-sm:w-2/3" onChange={(e)=> setUserName(e.target.value)}/>
    )
}