import { useReducer, createContext, useContext } from "react";

const initialState = {
  wallet: true,
  inventory: false,
  orders: false,
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
  const [state, dispatch] = useReducer(tabSwitcher, initialState);
  return (
    <MerchantContext.Provider value={{ state, dispatch, userData }}>
      {children}
    </MerchantContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMerchant = () => useContext(MerchantContext);
