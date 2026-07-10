import {
  MdBadge,
  MdAccountBalanceWallet,
  MdInventory,
  MdOutlineShoppingBag,
  MdBrightness7,
  MdContactSupport,
} from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";

function Sidebar() {
  const { state, dispatch } = useMerchant();
  console.log(state);
  return (
    <div className="hiddden md:static w-xs py-5 bg-slate-50 border-r border-slate-400">
      <div className="flex flex-col items-center gap-14 mx-5 py-2 h-full">
        {/* Ttile */}
        <div className="w-full flex flex-col items-start gap-4">
          <span className="text-2xl font-bold tracking-tighter text-slate-800">
            Nexus
          </span>
          <div className="flex items-center justify-around gap-3 ">
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
        <div className="flex flex-col items-start justify-around gap-2 w-full text-slate-600 tracking-wider font-bold capitalize">
          <span
            className={`w-full inline-flex items-center gap-2 px-5 py-2 rounded-md transition duration-150 cursor-pointer ${state.wallet ? "bg-blue-600 text-white px-8" : "hover:bg-blue-100"}`}
            onClick={() => dispatch({ type: "WALLET" })}
          >
            <MdAccountBalanceWallet
              className={`text-lg ${!state.wallet ? "text-slate-500" : "text-white"} `}
            />
            wallet
          </span>
          <span
            className={`w-full inline-flex items-center gap-2 px-5 py-2 rounded-md transition duration-150 cursor-pointer ${state.inventory ? "bg-blue-600 text-white px-8" : "hover:bg-blue-100"}`}
            onClick={() => dispatch({ type: "INVENTORY" })}
          >
            <MdInventory
              className={`text-lg ${!state.inventory ? "text-slate-500" : "text-white"} `}
            />
            inventory
          </span>
          <span
            className={`w-full inline-flex items-center gap-2 px-5 py-2 rounded-md transition duration-150 cursor-pointer ${state.orders ? "bg-blue-600 text-white px-8" : "hover:bg-blue-100"}`}
            onClick={() => dispatch({ type: "ORDERS" })}
          >
            <MdOutlineShoppingBag
              className={`text-lg ${!state.orders ? "text-slate-500" : "text-white"} `}
            />
            orders
          </span>
        </div>
        {/* footer */}
        <div className="flex-1"></div>
        <div className=" w-full flex flex-col gap-4">
          {/* withdraw botton */}
          <div className="w-full text-lg text-white tracking-tight capitalize bg-black text-center py-2 rounded-lg cursor-pointer">
            <p>request withdrawal</p>
          </div>
          <span className="h-px  bg-slate-400"></span>
          {/* profile view */}
          <div className="flex items-center justify-around mb-2">
            <span className="w-12">
              <img src="profile.png" alt="profile" className="rounded-xl" />
            </span>
            <div className="flex flex-col items-start justify-around capitalize">
              <span className="text-sm font-bold tracking-wider text-slate-800 text-nowrap">
                nexus merchant
              </span>
              <span className="text-xs tracking-widest font-bold text-slate-600 text-nowrap">
                ID: 987-D3
              </span>
            </div>
          </div>
          {/* nav */}
          <div className="flex flex-col items-start justify-around gap-2 capitalize text-800 tracking-widest">
            <span className="w-full inline-flex items-center gap-2 px-7 py-2 text-sm rounded-md hover:bg-blue-100 cursor-pointer">
              <MdBrightness7 className="text-lg text-slate-500" />
              setting
            </span>
            <span className="w-full inline-flex items-center gap-2 px-7 py-2 text-sm rounded-md hover:bg-blue-100 cursor-pointer">
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
