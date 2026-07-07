import HeaderMerch from "../components/merchComp/HeaderMerch";
import Inventory from "../components/merchComp/Inventory";
import Orders from "../components/merchComp/Orders";
import Sidebar from "../components/merchComp/Sidebar";
import Wallet from "../components/merchComp/Wallet";

import { MerchantProvider, useMerchant } from "../context/merchantContext";

function MerchantLayout() {
  const { state } = useMerchant();
  console.log(state);
  return (
    <div className="w-screen h-screen font-hanken tracking-tight">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col h-screen w-full">
          <HeaderMerch />
          <Wallet />
          <Inventory />
          <Orders />
        </div>
      </div>
    </div>
  );
}

function Merchant() {
  return (
    <MerchantProvider>
      <MerchantLayout />
    </MerchantProvider>
  );
}

export default Merchant;
