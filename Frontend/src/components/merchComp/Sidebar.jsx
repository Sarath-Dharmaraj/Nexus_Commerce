import {
  MdBadge,
  MdAccountBalanceWallet,
  MdInventory,
  MdOutlineShoppingBag,
  MdBrightness7,
  MdContactSupport,
} from "react-icons/md";

function Sidebar() {
  return (
    <div className="hiddden md:static w-[17.5%]  py-5 bg-slate-50 border-r border-slate-200">
      <div className="flex flex-col items-center gap-14 mx-5 py-2 h-full">
        {/* Ttile */}
        <div className="w-full flex flex-col items-start gap-4">
          <span className="text-2xl font-bold tracking-tighter text-slate-800">
            Nexus
          </span>
          <div className="flex items-center justify-around gap-3">
            <span className="bg-teal-700 text-white text-2xl p-2 rounded-lg ">
              <MdBadge />
            </span>
            <div className="flex flex-col items-start justify-around capitalize">
              <span className="text-2xl font-bold tracking-tight text-slate-800 text-nowrap">
                seller console
              </span>
              <span className="text-xs tracking-wider font-bold text-slate-600 text-nowrap">
                nexus merchant ops
              </span>
            </div>
          </div>
        </div>
        {/* Nav */}
        <div className="flex flex-col items-start justify-around gap-2 w-full text-slate-600 tracking-wider font-bold capitalize">
          <span className="w-full inline-flex items-center gap-2 px-5 py-2 rounded-md hover:bg-sky-100">
            <MdAccountBalanceWallet className="text-lg text-slate-500" />
            wallet
          </span>
          <span className="w-full inline-flex items-center gap-2 px-5 py-2 rounded-md hover:bg-sky-100">
            <MdInventory className="text-lg text-slate-500" />
            inventory
          </span>
          <span className="w-full inline-flex items-center gap-2 px-5 py-2 rounded-md hover:bg-sky-100">
            <MdOutlineShoppingBag className="text-lg text-slate-500" />
            orders
          </span>
        </div>
        {/* footer */}
        <div className="flex-1"></div>
        <div className=" w-full flex flex-col gap-4">
          {/* withdraw botton */}
          <div className="w-full text-lg text-white tracking-tight capitalize bg-black text-center py-2 rounded-lg">
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
            <span className="w-full inline-flex items-center gap-2 px-7 py-2 text-sm rounded-md hover:bg-sky-100">
              <MdBrightness7 className="text-lg text-slate-500" />
              setting
            </span>
            <span className="w-full inline-flex items-center gap-2 px-7 py-2 text-sm rounded-md hover:bg-sky-100">
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
