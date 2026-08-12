import {
  MdStorefront,
  MdCategory,
  MdPeople,
  MdAdminPanelSettings,
} from "react-icons/md";

function AdminSideBar({ page, setPage }) {
  const navItems = [
    {
      id: "MERCHANT",
      label: "Merchant & Payouts",
      icon: <MdStorefront className="text-xl" />,
    },
    {
      id: "PRODUCTS",
      label: "Product Moderation",
      icon: <MdCategory className="text-xl" />,
    },
    {
      id: "USERS",
      label: "User Directory",
      icon: <MdPeople className="text-xl" />,
    },
  ];

  return (
    <div className="flex flex-col h-full py-8 px-6 md:py-10 md:px-8">
      <div className="flex items-center gap-3 mb-8 md:mb-12 text-white">
        <MdAdminPanelSettings className="text-3xl md:text-4xl text-blue-500 shrink-0" />
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none">
            Nexus Admin
          </h1>
          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
            Command Center
          </p>
        </div>
      </div>

      <nav className="flex flex-col gap-2 md:gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-3.5 rounded-md transition-all font-bold text-xs md:text-sm tracking-wider w-full text-left ${
              page === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-700 pt-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></div>
          <p className="text-[10px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider">
            System Online
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
