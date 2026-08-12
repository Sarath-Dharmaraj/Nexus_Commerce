import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MdMenu } from "react-icons/md";

import AdminSideBar from "../components/adminComp/AdminSideBar";
import MerchantPanel from "../components/adminComp/MerchantPanel";
import ProductPanel from "../components/adminComp/ProductPanel";
import UserPanel from "../components/adminComp/UserPanel";
import { useGlobalAuth } from "../context/globalAuthContext";

function Admin() {
  const { user } = useGlobalAuth();
  const adminData = useLoaderData();

  const [page, setPage] = useState("MERCHANT");
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="w-screen h-screen flex flex-col md:flex-row font-hanken tracking-tight bg-slate-50 overflow-hidden relative">
      <div className="md:hidden w-full bg-slate-900 text-white flex items-center px-5 py-4 z-20 shadow-md">
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl mr-4 hover:text-slate-300 transition-colors"
        >
          <MdMenu />
        </button>
        <h1 className="text-lg font-black tracking-tight leading-none">
          Nexus Admin
        </h1>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:static inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition duration-300 ease-in-out z-50 w-[75%] sm:w-[50%] md:w-[30%] lg:w-[20%] max-w-sm h-full bg-slate-900 text-white shadow-2xl`}
      >
        <AdminSideBar
          page={page}
          setPage={(newPage) => {
            setPage(newPage);
            setIsOpen(false);
          }}
        />
      </div>

      <div className="flex-1 w-full md:w-[70%] lg:w-[80%] h-full overflow-y-auto relative z-10">
        {page === "MERCHANT" && <MerchantPanel data={adminData} />}
        {page === "PRODUCTS" && <ProductPanel data={adminData} />}
        {page === "USERS" && <UserPanel data={adminData} />}
      </div>
    </div>
  );
}

export default Admin;
