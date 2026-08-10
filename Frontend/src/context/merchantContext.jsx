import { useReducer, createContext, useContext, useEffect } from "react";

const initialState = {
  screen: "WALLET",
  isFilter: false,
  sortBy: "NONE",
  categoryBy: "ALL",
  isEdit: false,
  popup: "NONE",
  data: null,
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
      return {
        ...state,
        isFilter:
          action.payload !== undefined ? action.payload : !state.isFilter,
      };
    case "SET_SORT_FILTER":
      return {
        ...state,
        isFilter: true,
        sortBy: action.payload.sortBy,
        categoryBy: action.payload.categoryBy,
      };
    case "RESET_ALL":
      return {
        ...state,
        isFilter: false,
        sortBy: initialState.sortBy,
        categoryBy: initialState.categoryBy,
      };
    case "SET_EDIT": {
      return {
        ...initialState,
        screen: "ADD_PRODUCT",
        isEdit: true,
        data: action.payload,
      };
    }
    case "SET_POPUP": {
      return { ...initialState, screen: state.screen, popup: action.payload };
    }
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
