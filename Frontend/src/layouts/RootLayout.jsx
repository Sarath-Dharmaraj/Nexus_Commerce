import { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { GlobalContext } from "../context/globalAuthContext";

export default function RootLayout() {
  const { user: initialUser } = useLoaderData() || {};

  const [user, setUser] = useState(initialUser);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <Outlet />
    </GlobalContext.Provider>
  );
}
