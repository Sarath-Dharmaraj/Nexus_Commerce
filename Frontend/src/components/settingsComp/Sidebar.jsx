import {
  MdAccountCircle,
  MdCreditCard,
  MdPlace,
  MdStore,
  MdNotifications,
  MdSecurity,
  MdDashboard,
  MdAdminPanelSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useGlobalAuth } from "../../context/globalAuthContext";
import { useSettings } from "../../context/settingsContext";

function Sidebar({ page, setPage }) {
  const { user } = useGlobalAuth();
  const settingsData = useSettings() || {};
  const navigate = useNavigate();

  const role = user?.systemRoles || [];
  const isSeller = role.includes("Seller");
  const isApprovedSeller = settingsData?.sellerProfile?.isApproved;
  const isAdmin = user?.isAdmin;

  const btnClass = (targetPage) =>
    `w-fit md:w-full flex items-center gap-2 md:gap-3 text-sm font-medium capitalize hover:bg-blue-500 hover:text-white px-3 py-2 md:px-4 md:py-2.5 rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${
      page === targetPage ? "bg-blue-500 text-white" : "text-slate-600"
    }`;

  return (
    <div className="w-full h-auto md:h-full flex flex-col items-start bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 px-2 md:px-4 py-4 md:py-8 gap-3 md:gap-6">
      <span className="text-slate-800 tracking-wider text-xl md:text-2xl font-thin px-2 md:px-4">
        Settings
      </span>

      <div className="w-full flex flex-row md:flex-col items-center md:items-start gap-2 overflow-x-auto md:overflow-visible pb-2 md:px-0 scrollbar-none">
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

        {/* --- SELLER SECTION --- */}
        {isSeller && (
          <>
            <div className="hidden md:block w-full h-px bg-slate-200 my-2 shrink-0"></div>
            <div className="md:hidden w-px h-6 bg-slate-200 mx-1 shrink-0"></div>

            <div className="hidden md:block px-4 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mt-1">
              Seller Content
            </div>

            {isApprovedSeller && (
              <button
                className="w-fit md:w-full flex items-center gap-2 md:gap-3 text-sm font-bold capitalize bg-slate-800 text-white hover:bg-black px-3 py-2 md:px-4 md:py-2.5 rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
                onClick={() => navigate("/merchant")}
              >
                <span className="text-lg md:text-xl shrink-0">
                  <MdDashboard />
                </span>
                <span>Merchant Dashboard</span>
              </button>
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
          </>
        )}

        {/* --- ADMIN SECTION --- */}
        {isAdmin && (
          <>
            <div className="hidden md:block w-full h-px bg-slate-200 my-2 shrink-0"></div>
            <div className="md:hidden w-px h-6 bg-slate-200 mx-1 shrink-0"></div>

            <div className="hidden md:block px-4 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mt-1">
              System
            </div>

            <button
              className="w-fit md:w-full flex items-center gap-2 md:gap-3 text-sm font-bold capitalize bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 md:px-4 md:py-2.5 rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
              onClick={() => navigate("/admin")}
            >
              <span className="text-lg md:text-xl shrink-0">
                <MdAdminPanelSettings />
              </span>
              <span>Admin Panel</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
