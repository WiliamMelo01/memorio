import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

export interface IUserDataContextType {
    userName: string
    userId: string
    setUserName: Dispatch<SetStateAction<string>>
    setUserId: Dispatch<SetStateAction<string>>
}

export const UserDataContext = createContext<IUserDataContextType | null>(null);

export default function UserDataProvider({ children }: { children: ReactNode }) {

    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");

    return <UserDataContext.Provider value={{ userName, setUserName, setUserId, userId }}>
        {children}
    </UserDataContext.Provider>
}
