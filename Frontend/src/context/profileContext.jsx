import { createContext, useContext, useReducer } from "react";

const initialState = {
  isOrdersOpen: false,
  isCardListOpen: false,
  isAddressListOpen: false,
  isProfileEditOpen: false,
  isAddCardOpen: false,
  isAddAddressOpen: false,
  selectedItem: null,
};

function tabSwitcher(state, action) {
  switch (action.type) {
    case "OPEN_ORDERS":
      return { ...initialState, isOrdersOpen: true };
    case "OPEN_CARD_LIST":
      return { ...initialState, isCardListOpen: true };
    case "OPEN_ADDRESS_LIST":
      return { ...initialState, isAddressListOpen: true };
    case "OPEN_PROFILE_EDIT":
      return { ...initialState, isProfileEditOpen: true };
    case "OPEN_ADD_CARD":
      return {
        ...initialState,
        isAddCardOpen: true,
        selectedItem: action.payload || null,
      };
    case "OPEN_ADD_ADDRESS":
      return {
        ...initialState,
        isAddAddressOpen: true,
        selectedItem: action.payload || null,
      };

    default:
      return initialState;
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
