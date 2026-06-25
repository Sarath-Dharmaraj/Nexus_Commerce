import { createContext, useContext, useReducer } from "react";

const initialState = {
  isOrdersOpen: false,
  isCardsOpen: false,
  isAddressOpen: false,
};

function tabSwitcher(state, action) {
  switch (action.type) {
    case "OPEN_ORDERS":
      return { isOrdersOpen: true, isCardsOpen: false, isAddressOpen: false };
    case "OPEN_CARDS":
      return { isOrdersOpen: false, isCardsOpen: true, isAddressOpen: false };
    case "OPEN_ADDRESS":
      return { isOrdersOpen: false, isCardsOpen: false, isAddressOpen: true };
    default:
      return { isOrdersOpen: false, isCardsOpen: false, isAddressOpen: false };
  }
}
const profileContext = createContext(null);

export const ProfileProvider = ({ children, userData }) => {
  const [state, dispatch] = useReducer(tabSwitcher, initialState);

  return (
    <profileContext.Provider value={{ state, dispatch, userData }}>
      {children}
    </profileContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(profileContext);
