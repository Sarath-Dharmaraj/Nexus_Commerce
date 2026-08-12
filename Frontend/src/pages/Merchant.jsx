import { useLoaderData, useNavigate } from "react-router-dom";
import { MdLaptopMac, MdSettings } from "react-icons/md";

import HeaderMerch from "../components/merchComp/HeaderMerch";
import Inventory from "../components/merchComp/Inventory";
import Orders from "../components/merchComp/Orders";
import Sidebar from "../components/merchComp/Sidebar";
import Wallet from "../components/merchComp/Wallet";
import AddProducts from "../components/merchComp/AddProducts";
import Withdraw from "../components/merchComp/withdraw";

import { MerchantProvider } from "../context/merchantContext";

function MerchantLayout() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen font-hanken tracking-tight bg-slate-50">
      <div className="flex lg:hidden flex-col items-center justify-center h-full px-6 text-center">
        <div className="bg-white p-8 rounded-xl shadow-xl border border-slate-200 flex flex-col items-center max-w-sm">
          <MdLaptopMac className="text-6xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            Desktop Required
          </h2>
          <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">
            The Merchant Console contains complex data tables and management
            tools that are optimized exclusively for laptop and desktop
            displays.
          </p>
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-md font-bold hover:bg-black transition-colors w-full justify-center shadow-md"
          >
            <MdSettings className="text-lg" />
            Go to Settings
          </button>
        </div>
      </div>

      <div className="hidden lg:flex h-screen">
        <Sidebar />
        <div className="relative flex flex-col h-screen w-full bg-white">
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
