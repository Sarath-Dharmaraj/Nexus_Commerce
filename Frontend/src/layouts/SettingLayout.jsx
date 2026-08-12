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
    <div className="w-full h-full flex flex-col md:flex-row items-start font-hanken text-slate-600 tracking-tight">
      <div className="w-full md:w-1/4 lg:w-1/5 flex flex-col h-auto md:h-full shrink-0">
        <Sidebar page={page} setPage={setPage} />
      </div>
      <div className="w-full md:w-3/4 lg:w-4/5 h-full overflow-y-auto items-start justify-start">
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
