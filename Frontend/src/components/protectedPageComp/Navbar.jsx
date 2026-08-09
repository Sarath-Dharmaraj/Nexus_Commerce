import { useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
  MdOutlineSearch,
  MdOutlineFavoriteBorder,
} from "react-icons/md";

function Navbar() {
  const location = useLocation();
  const nav = useNavigate();

  return (
    <>
      <div className="sticky top-0 left-0 z-50 w-full h-auto md:h-20 px-3 md:px-10 lg:px-14 py-2 md:py-0 border-b border-slate-400 flex flex-wrap md:flex-nowrap items-center justify-between bg-slate-50 gap-y-2">
        <div className="w-full md:w-auto text-xl md:text-2xl font-semibold px-4 md:px-0 md:text-left shrink-0">
          Nexus Commerce
        </div>

        <div
          className={`flex flex-1 items-center justify-between px-2 md:px-4 lg:px-8 ${
            location.pathname === "/merchant" ||
            location.pathname === "/settings"
              ? "md:flex-row"
              : "md:flex-row-reverse"
          }`}
        >
          <nav className="hidden md:flex items-center text-sm lg:text-base text-slate-600 capitalize gap-4 md:gap-2 lg:gap-8 shrink-0">
            <a
              href="/home"
              className="hover:text-black cursor-pointer underline hover:no-underline"
            >
              shop
            </a>
            <a
              href="#categories"
              className="hover:text-black cursor-pointer underline hover:no-underline"
            >
              categories
            </a>
            <a
              href="#deals"
              className="hover:text-black cursor-pointer underline hover:no-underline"
            >
              deals
            </a>
          </nav>

          <div className="relative flex items-center w-full md:w-auto">
            <MdOutlineSearch className="absolute left-2 text-lg md:text-xl lg:text-2xl text-slate-500" />
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="w-full md:w-40 lg:w-72 xl:w-96 h-8 md:h-10 text-sm lg:text-base text-slate-600 border border-slate-500 hover:border-blue-200 focus:border-blue-200 focus:outline-none rounded-md pl-8 md:pl-9 lg:pl-10 pr-3 md:pr-4 bg-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center text-xl lg:text-2xl gap-3 lg:gap-6 shrink-0">
          <MdOutlineAccountCircle
            onClick={() => nav("/profile")}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <MdOutlineFavoriteBorder
            onClick={() => nav("/wishlist")}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
          <MdOutlineShoppingCart
            onClick={() => nav("/cart")}
            className="cursor-pointer hover:text-blue-500 transition-colors"
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
