import { IUserDataContextType, UserDataContext } from "@/contexts/userData";
import { useContext } from "react";

export function useUserData() : IUserDataContextType {
    return useContext(UserDataContext) as IUserDataContextType ;
}