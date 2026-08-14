import { useNavigate } from "react-router-dom";

import {
  MdBadge,
  MdAccountBalanceWallet,
  MdInventory,
  MdOutlineShoppingBag,
  MdBrightness7,
  MdContactSupport,
} from "react-icons/md";

import { useGlobalAuth } from "../../context/globalAuthContext";
import { useMerchant } from "../../context/merchantContext";

function Sidebar() {
  const { user } = useGlobalAuth();
  const { state, dispatch } = useMerchant();

  const nav = useNavigate();
  return (
    <div className="hiddden md:static w-xs py-5 bg-blue-50 border-r border-slate-200 font-hanken">
      <div className="flex flex-col items-center gap-14 mx-5 py-2 h-full">
        {/* Ttile */}
        <div className="w-full flex flex-col items-start gap-4">
          <span className="text-2xl font-black tracking-wider text-black">
            Nexus Commerce
          </span>
          <div className="flex items-center justify-around gap-3 px-3 py-2 bg-white border rounded-md border-slate-100 shadow-xl">
            <span className="bg-teal-700 text-white text-xl lg:text-2xl p-2 rounded-lg ">
              <MdBadge />
            </span>
            <div className="flex flex-col items-start justify-around capitalize ">
              <span className="text-xl lg:text-2xl font-bold tracking-tight text-slate-800 text-nowrap">
                seller console
              </span>
              <span className="text-[10px] lg:text-xs tracking-wider font-bold text-slate-600 text-nowrap">
                nexus merchant ops
              </span>
            </div>
          </div>
        </div>
        {/* Nav */}
        <div className="flex flex-col items-start justify-around gap-2 w-full bg-white py-5 px-3 border rounded-md border-slate-100 shadow-2xs text-slate-600 tracking-wider font-bold capitalize ">
          <span
            className={`w-full inline-flex items-center gap-2 px-5 py-2 rounded-md transition duration-150 cursor-pointer ${state.screen === "WALLET" ? "bg-slate-500 text-white px-8" : "hover:bg-slate-200"}`}
            onClick={() => dispatch({ type: "SET_SCREEN", payload: "WALLET" })}
          >
            <MdAccountBalanceWallet
              className={`text-lg ${!(state.screen === "WALLET") ? "text-slate-500" : "text-white"} `}
            />
            wallet
          </span>
          <span
            className={`w-full inline-flex items-center gap-2 px-5 py-2 rounded-md transition duration-150 cursor-pointer ${state.screen === "INVENTORY" ? "bg-slate-500 text-white px-8" : "hover:bg-slate-200"}`}
            onClick={() =>
              dispatch({ type: "SET_SCREEN", payload: "INVENTORY" })
            }
          >
            <MdInventory
              className={`text-lg ${!(state.screen === "INVENTORY") ? "text-slate-500" : "text-white"} `}
            />
            inventory
          </span>
          <span
            className={`w-full inline-flex items-center gap-2 px-5 py-2 rounded-md transition duration-150 cursor-pointer ${state.screen === "ORDERS" ? "bg-slate-500 text-white px-8" : "hover:bg-slate-200"}`}
            onClick={() => dispatch({ type: "SET_SCREEN", payload: "ORDERS" })}
          >
            <MdOutlineShoppingBag
              className={`text-lg ${!(state.screen === "ORDERS") ? "text-slate-500" : "text-white"} `}
            />
            orders
          </span>
        </div>
        {/* footer */}
        <div className="flex-1"></div>
        <div className=" w-full flex flex-col gap-4">
          {/* withdraw botton */}
          <div
            onClick={() =>
              dispatch({ type: "SET_POPUP", payload: "withdrawn" })
            }
            className="w-full text-lg text-white tracking-tight capitalize bg-black text-center py-2 rounded-lg cursor-pointer"
          >
            <p>request withdrawal</p>
          </div>
          <span className="h-px  bg-slate-400"></span>
          {/* profile view */}
          <div className="flex items-center justify-around mb-2 bg-white py-3 border border-slate-200 rounded-md shadow-sm">
            <span className="w-12">
              <img
                src={user.profileImage}
                referrerPolicy="no-referrer"
                alt="profile"
                className="rounded-xl"
              />
            </span>
            <div className="flex flex-col items-start justify-around capitalize">
              <span className="text-sm font-bold tracking-wider text-slate-800 text-nowrap">
                nexus merchant
              </span>
              <span className="text-xs tracking-widest font-bold text-slate-600 text-nowrap">
                Name: {user.fullName.split(" ")[0]}
              </span>
            </div>
          </div>
          {/* nav */}
          <div className="flex flex-col items-start justify-around gap-2 capitalize text-800 tracking-widest">
            <span
              onClick={() => nav("/settings")}
              className="w-full inline-flex items-center gap-2 px-7 py-2 font-black text-slate-800 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <MdBrightness7 className="text-lg text-slate-500" />
              setting
            </span>
            <span className="w-full inline-flex items-center gap-2 px-7 py-2 text-sm rounded-md hover:bg-slate-200 cursor-pointer">
              <MdContactSupport className="text-lg text-slate-500" />
              support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
