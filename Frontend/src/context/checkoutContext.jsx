/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const initialState = {
  address: null,
  payment: null,
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case "SET_ADDRESS": {
      return { ...state, address: action.payload };
    }
    case "SET_PAYMENT": {
      return { ...state, payment: action.payload };
    }
    default:
      return state;
  }
}

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
}

const useCheckout = () => useContext(CheckoutContext);
export default useCheckout;
