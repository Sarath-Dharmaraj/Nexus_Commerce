/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

const settingsContext = createContext(null);

export function SettingsProvider({ children, userData }) {
  return (
    <settingsContext.Provider value={userData}>
      {children}
    </settingsContext.Provider>
  );
}

export const useSettings = () => useContext(settingsContext);
