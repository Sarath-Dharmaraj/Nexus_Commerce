import {
  MdAccountCircle,
  MdCreditCard,
  MdPlace,
  MdStore,
  MdNotifications,
  MdSecurity,
} from "react-icons/md";

import { useGlobalAuth } from "../../context/globalAuthContext";

function Sidebar({ page, setPage }) {
  const { user } = useGlobalAuth();
  const role = user.systemRoles;

  const btnClass = (targetPage) =>
    `w-fit md:w-full flex items-center gap-2 md:gap-3 text-sm font-normal capitalize hover:bg-blue-500 hover:text-white px-3 py-2 md:px-4 md:py-2.5 rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
      page === targetPage ? "bg-blue-500 text-white" : "text-slate-600"
    }`;

  return (
    <div className="w-full h-auto md:h-full flex flex-col items-start bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 px-2 md:px-4 py-4 md:py-8 gap-3 md:gap-6">
      <span className="text-slate-800 tracking-wider text-xl md:text-2xl font-thin px-2 md:px-4">
        Settings
      </span>

      <div className="w-full flex flex-row md:flex-col items-center md:items-start gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 px-2 md:px-0 scrollbar-hide">
        <button
          className={btnClass("account")}
          onClick={() => setPage("account")}
        >
          <span className="text-lg md:text-xl shrink-0">
            <MdAccountCircle />
          </span>
          <span>Account & Profile</span>
        </button>

        <button
          className={btnClass("security")}
          onClick={() => setPage("security")}
        >
          <span className="text-lg md:text-xl shrink-0">
            <MdSecurity />
          </span>
          <span>Security & Login</span>
        </button>

        <button
          className={btnClass("address")}
          onClick={() => setPage("address")}
        >
          <span className="text-lg md:text-xl shrink-0">
            <MdPlace />
          </span>
          <span>Saved Addresses</span>
        </button>

        <button
          className={btnClass("payment")}
          onClick={() => setPage("payment")}
        >
          <span className="text-lg md:text-xl shrink-0">
            <MdCreditCard />
          </span>
          <span>Payment Methods</span>
        </button>

        <button
          className={btnClass("notification")}
          onClick={() => setPage("notification")}
        >
          <span className="text-lg md:text-xl shrink-0">
            <MdNotifications />
          </span>
          <span>Notifications</span>
        </button>

        {/* Desktop Divider */}
        <div className="hidden md:block w-full h-px bg-slate-200 my-2 shrink-0"></div>
        {/* Mobile Divider */}
        <div className="md:hidden w-px h-6 bg-slate-200 mx-1 shrink-0"></div>

        {role?.includes("Seller") && (
          <div className="hidden md:block px-4 text-sm shrink-0">
            Seller Content
          </div>
        )}

        <button
          className={btnClass("merchant")}
          onClick={() => setPage("merchant")}
        >
          <span className="text-lg md:text-xl shrink-0">
            <MdStore />
          </span>
          <span>Merchant Hub</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
