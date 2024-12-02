import React from "react";
import { IUser } from "types";
type SavonUser = null | IUser;
type AppProps = {
  user: SavonUser;
  _setUser: (user: IUser) => void;
  _removerUser: () => void;
};

const AppContext = React.createContext({} as AppProps);
export const useAppContext = () => React.useContext(AppContext);

const KEY = "savon";
type Props = { children: React.ReactNode };
export default function SavonAppProvider({ children }: Props) {
  /** declare this func on top because of lexical scoppingissue of scoping */
  const _getUserLocal = (): SavonUser => {
    const _user = globalThis?.window
      ? JSON.parse(localStorage.getItem(KEY) as string)
      : null;
    return _user;
  };
  const [user, setUser] = React.useState<SavonUser>(_getUserLocal());

  React.useEffect(() => {
    if (user === null) {
      const _user = _getUserLocal();
      setUser(_user);
    }
  }, []);

  // helper methods for local storage and app context
  const _setUser = (user: IUser) => {
    setUser(user);
    _setuserLocal(user);
  };
  //log out
  const _removerUser = () => {
    setUser(null);
    _removeUserLocal();
  };
  const _setuserLocal = (user: IUser) => {
    localStorage.setItem(KEY, JSON.stringify(user));
  };

  const _removeUserLocal = () => {
    localStorage.removeItem(KEY);
  };
  return (
    <AppContext.Provider value={{ user, _setUser, _removerUser }}>
      {children}
    </AppContext.Provider>
  );
}
