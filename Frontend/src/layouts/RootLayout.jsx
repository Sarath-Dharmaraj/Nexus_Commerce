/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { GlobalContext } from "../context/globalAuthContext";

export default function RootLayout() {
  const loaderData = useLoaderData() || {};

  const [user, setUser] = useState(loaderData.user);

  useEffect(() => {
    setUser(loaderData.user);
  }, [loaderData.user]);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <Outlet />
    </GlobalContext.Provider>
  );
}
