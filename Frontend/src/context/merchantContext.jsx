import { useReducer, createContext, useContext, useEffect } from "react";

const initialState = {
  screen: "WALLET",
  isFilter: "ALL",
  sortBy: "DEFAULT",
  categoryBy: "ALL",
};

const initializeState = (defaultState) => {
  try {
    const storedScreen = localStorage.getItem("merchantScreen");
    return storedScreen
      ? { ...defaultState, screen: storedScreen }
      : defaultState;
  } catch (error) {
    console.error("Failed to parse stored merchant UI state", error);
    return defaultState;
  }
};

function merchantReducer(state, action) {
  switch (action.type) {
    case "SET_SCREEN":
      return { ...initialState, screen: action.payload };
    case "SET_FILTER":
      return { ...state, isFilter: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_CATEGORY":
      return { ...state, categoryBy: action.payload };
    case "RESET_FILTERS":
      return {
        ...state,
        isFilter: initialState.isFilter,
        sortBy: initialState.sortBy,
        categoryBy: initialState.categoryBy,
      };
    default:
      return state;
  }
}

const MerchantContext = createContext(null);

export function MerchantProvider({ children, merchantData }) {
  const [state, dispatch] = useReducer(
    merchantReducer,
    initialState,
    initializeState,
  );

  useEffect(() => {
    localStorage.setItem("merchantScreen", state.screen);
  }, [state.screen]);

  return (
    <MerchantContext.Provider value={{ state, dispatch, merchantData }}>
      {children}
    </MerchantContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMerchant = () => useContext(MerchantContext);
