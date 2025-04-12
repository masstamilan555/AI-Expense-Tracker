import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children, stats, catexp }) => {
  return (
    <UserContext.Provider value={{ stats, catexp }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
