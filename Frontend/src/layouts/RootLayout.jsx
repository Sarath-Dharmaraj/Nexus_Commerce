import { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

const GlobalContext = createContext();

export default function RootLayout() {
  const { user: initialUser } = useLoaderData();

  const [user, setUser] = useState(initialUser);
  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <Outlet />
    </GlobalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalAuth = () => useContext(GlobalContext);
