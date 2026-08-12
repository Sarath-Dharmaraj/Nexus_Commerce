import { useLoaderData } from "react-router-dom";
import HeaderMerch from "../components/merchComp/HeaderMerch";
import Inventory from "../components/merchComp/Inventory";
import Orders from "../components/merchComp/Orders";
import Sidebar from "../components/merchComp/Sidebar";
import Wallet from "../components/merchComp/Wallet";

import { MerchantProvider } from "../context/merchantContext";
import AddProducts from "../components/merchComp/AddProducts";
import Withdraw from "../components/merchComp/withdraw";

function MerchantLayout() {
  return (
    <div className="hidden lg:block w-screen h-screen font-hanken tracking-tight">
      <div className="flex h-screen">
        <Sidebar />
        <div className="relative flex flex-col h-screen w-full">
          <Withdraw />
          <HeaderMerch />
          <Wallet />
          <Inventory />
          <Orders />
          <AddProducts />
        </div>
      </div>
    </div>
  );
}

function Merchant() {
  const data = useLoaderData();
  return (
    <MerchantProvider merchantData={data}>
      <MerchantLayout />
    </MerchantProvider>
  );
}

export default Merchant;
