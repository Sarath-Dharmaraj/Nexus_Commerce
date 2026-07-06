import { useReducer } from "react";

import HeaderMerch from "../components/merchComp/HeaderMerch";
import Sidebar from "../components/merchComp/Sidebar";

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

function Merchant() {
  const [state, dispatch] = useReducer(tabSwitcher, initialState);
  return (
    <div className="w-screen h-screen font-hanken tracking-tight">
      <div className="flex h-screen">
        <Sidebar state={state} dispatch={dispatch} />
        <div className="flex flex-col h-screen w-full">
          <HeaderMerch />
        </div>
      </div>
    </div>
  );
}

export default Merchant;
