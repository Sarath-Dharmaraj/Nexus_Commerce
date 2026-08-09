import { useState } from "react";
import Sidebar from "../components/settingsComp/Sidebar";
import AccountProfile from "../components/settingsComp/AccountProfile";
import SecurityLogin from "../components/settingsComp/SecurityLogin";
import Addresses from "../components/settingsComp/Addresses";
import Payments from "../components/settingsComp/Payments";
import Merchant from "../components/settingsComp/Merchant";

function SettingLayout() {
  const [page, setPage] = useState("account");

  return (
    <div className="w-full h-full flex items-center font-hanken text-slate-600 tracking-tight">
      <div className="w-1/4 flex flex-col h-full">
        <Sidebar page={page} setPage={setPage} />
      </div>
      <div className="w-3/4 h-full items-start justify-start">
        {page === "account" && <AccountProfile />}
        {page === "security" && <SecurityLogin />}
        {page === "address" && <Addresses />}
        {page === "payment" && <Payments />}
        {page === "merchant" && <Merchant />}
      </div>
    </div>
  );
}

export default SettingLayout;
