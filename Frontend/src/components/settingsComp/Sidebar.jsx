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
    `w-full flex items-center gap-3 text-sm font-normal capitalize hover:bg-blue-500 hover:text-white px-4 py-2.5 rounded-md transition-all duration-300 cursor-pointer ${
      page === targetPage ? "bg-blue-500 text-white" : "text-slate-600"
    }`;

  return (
    <div className="w-full h-full flex flex-col items-start bg-slate-50 border-r border-slate-200 px-4 py-8 gap-6">
      <span className="text-slate-800 tracking-wider text-2xl font-thin px-4">
        Settings
      </span>

      <div className="w-full flex flex-col items-start gap-2">
        <button
          className={btnClass("account")}
          onClick={() => setPage("account")}
        >
          <span className="text-xl shrink-0">
            <MdAccountCircle />
          </span>
          <span>Account & Profile</span>
        </button>

        <button
          className={btnClass("security")}
          onClick={() => setPage("security")}
        >
          <span className="text-xl shrink-0">
            <MdSecurity />
          </span>
          <span>Security & Login</span>
        </button>

        <button
          className={btnClass("address")}
          onClick={() => setPage("address")}
        >
          <span className="text-xl shrink-0">
            <MdPlace />
          </span>
          <span>Saved Addresses</span>
        </button>

        <button
          className={btnClass("payment")}
          onClick={() => setPage("payment")}
        >
          <span className="text-xl shrink-0">
            <MdCreditCard />
          </span>
          <span>Payment Methods</span>
        </button>

        <button
          className={btnClass("notification")}
          onClick={() => setPage("notification")}
        >
          <span className="text-xl shrink-0">
            <MdNotifications />
          </span>
          <span>Notifications</span>
        </button>

        <div className="w-full h-px bg-slate-200 my-2"></div>
        {role?.includes("Seller") && <div>Seller Content</div>}
        <button
          className={btnClass("merchant")}
          onClick={() => setPage("merchant")}
        >
          <span className="text-xl shrink-0">
            <MdStore />
          </span>
          <span>Merchant Hub</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
