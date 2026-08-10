import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import AdminSideBar from "../components/adminComp/AdminSideBar";
import MerchantPanel from "../components/adminComp/MerchantPanel";
import ProductPanel from "../components/adminComp/ProductPanel";
import UserPanel from "../components/adminComp/UserPanel";
import { useGlobalAuth } from "../context/globalAuthContext";

function Admin() {
  const { user } = useGlobalAuth();
  const adminData = useLoaderData();

  const [page, setPage] = useState("MERCHANT");

  if (!user || !user.isAdmin) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-50 text-slate-800 font-hanken">
        <div className="text-center">
          <h1 className="text-4xl font-black text-red-600 mb-2">403</h1>
          <p className="text-lg font-bold text-slate-600 uppercase tracking-widest">
            Unauthorized Access
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex font-hanken tracking-tight bg-slate-50 overflow-hidden">
      <div className="w-[30%] max-w-sm h-full bg-slate-900 text-white shadow-2xl z-20">
        <AdminSideBar page={page} setPage={setPage} />
      </div>

      <div className="w-[70%] flex-1 h-full overflow-y-auto relative z-10">
        {page === "MERCHANT" && <MerchantPanel data={adminData} />}
        {page === "PRODUCTS" && <ProductPanel data={adminData} />}
        {page === "USERS" && <UserPanel data={adminData} />}
      </div>
    </div>
  );
}

export default Admin;
