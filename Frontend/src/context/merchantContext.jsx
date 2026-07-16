import { useReducer, createContext, useContext, useEffect } from "react";

const initialState = {
  wallet: true,
  inventory: false,
  orders: false,
};

const initializeState = (defaultState) => {
  try {
    const storedState = sessionStorage.getItem("merchantUIState");
    return storedState ? JSON.parse(storedState) : defaultState;
  } catch (error) {
    console.error("Failed to parse stored merchant UI state", error);
    return defaultState;
  }
};

function tabSwitcher(state, action) {
  switch (action.type) {
    case "WALLET":
      return initialState;
    case "INVENTORY":
      return { ...initialState, wallet: false, inventory: true };
    case "ORDERS":
      return { ...initialState, wallet: false, orders: true };
    default:
      return initialState;
  }
}

const MerchantContext = createContext(null);

export function MerchantProvider({ children, userData }) {
  const [state, dispatch] = useReducer(tabSwitcher, initialState, initializeState);

  useEffect(() => {
    sessionStorage.setItem("merchantUIState", JSON.stringify(state));
  }, [state]);

  return (
    <MerchantContext.Provider value={{ state, dispatch, userData }}>
      {children}
    </MerchantContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMerchant = () => useContext(MerchantContext);