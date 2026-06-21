import { useLocation } from "react-router-dom";
import {
  MdOutlineAccountCircle,
  MdOutlineHistory,
  MdShoppingCart,
  MdOutlineSearch,
} from "react-icons/md";

function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="sticky top-0 left-0 z-50 w-full h-auto md:h-20 px-4 md:px-8 py-4 md:py-0 flex flex-wrap md:flex-nowrap items-center justify-between bg-slate-100 gap-y-4">
        <div className="w-full md:w-auto text:sm md:text-xl lg:text-2xl whitespace-nowrap font-semibold md:text-left">
          Nexus Commerce
        </div>

        <div
          className={`flex flex-1 items-center justify-between pr-4 md:px-12 ${
            location.pathname === "/home"
              ? "md:flex-row-reverse"
              : "md:flex-row"
          }`}
        >
          <nav className="hidden md:flex items-center text-md capitalize md:gap-5 lg:gap-8">
            <a href="#shop" className="hover:text-blue-500 cursor-pointer">
              shop
            </a>
            <a
              href="#categories"
              className="hover:text-blue-500 cursor-pointer"
            >
              categories
            </a>
            <a href="#deals" className="hover:text-blue-500 cursor-pointer">
              deals
            </a>
          </nav>

          {/* Search Input Container */}
          <div className="relative flex items-center w-full md:w-auto">
            <MdOutlineSearch className="absolute left-3 text-2xl text-slate-500" />
            <input
              type="text"
              name="search"
              placeholder="Search Product..."
              className="w-full md:w-64 lg:w-96 h-10 text-slate-600 border border-slate-500 hover:border-blue-300 focus:border-blue-300 focus:outline-none rounded-md pl-10 pr-4 bg-slate-200"
            />
          </div>
        </div>

        {/* Row 2 on Mobile (Icons) / Right Side on Desktop */}
        <div className="flex items-center text-2xl gap-4 md:gap-6 shrink-0">
          <MdOutlineAccountCircle className="cursor-pointer hover:text-blue-500 transition-colors" />
          <MdOutlineHistory className="cursor-pointer hover:text-blue-500 transition-colors" />
          <MdShoppingCart className="cursor-pointer hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
