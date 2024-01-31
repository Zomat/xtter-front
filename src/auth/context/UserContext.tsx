import { ReactNode, createContext, useState } from "react";

export interface IUserContext {
  user: any;
  setUser: any;
}

interface IUserContextProvider {
  children: ReactNode;
}

export interface IAuthUser {
  email: string;
  nick: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserContextProvider = ({children}: IUserContextProvider) => {
  const [user, setUser] = useState<IAuthUser | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
};