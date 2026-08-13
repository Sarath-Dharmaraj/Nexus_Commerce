import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdOutlineAccountCircle,
  MdOutlineShoppingCart,
  MdOutlineSearch,
  MdOutlineFavoriteBorder,
  MdOutlineSettings,
} from "react-icons/md";
import api from "../../api/api";
import { useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const nav = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      setIsSearching(true);
      try {
        const response = await api.get(`/product/search?query=${searchQuery}`);
        console.log(response);
        if (response.data.success) {
          nav("/explore", {
            state: {
              products: response.data.products,
              query: searchQuery,
            },
          });
          setSearchQuery("");
        }
      } catch (error) {
        console.error("Search API Error:", error);
      } finally {
        setIsSearching(false);
      }
    } else if (searchQuery === "") return nav("/home");
  };

  return (
    <>
      <div className="sticky top-0 left-0 z-50 w-full h-auto md:h-20 px-3 md:px-10 lg:px-14 py-2 md:py-0 border-b border-slate-400 flex flex-wrap md:flex-nowrap items-center justify-between bg-slate-50 gap-y-2 shadow-sm">
        <div
          onClick={() => nav("/home")}
          className="w-full md:w-auto text-xl md:text-lg lg:text-2xl font-black text-slate-800 tracking-tighter px-4 md:px-0 md:text-left shrink-0 cursor-pointer"
        >
          Nexus Commerce
        </div>

        <div
          className={`flex flex-1 items-center md:gap-6 lg:gap-0 lg:justify-between px-2 md:px-4 lg:px-8 ${
            location.pathname === "/merchant" ||
            location.pathname === "/settings"
              ? "md:flex-row"
              : "md:flex-row-reverse"
          }`}
        >
          <nav className="hidden md:flex items-center text-sm lg:text-base font-bold text-slate-600 capitalize gap-4 md:gap-2 lg:gap-8 shrink-0">
            <a
              href="/home"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Shop
            </a>
            <a
              href="#categories"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Categories
            </a>
            <a
              href="#deals"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Deals
            </a>
          </nav>

          <div className="relative flex items-center w-full md:w-auto flex-1 lg:flex-0">
            <MdOutlineSearch className="absolute left-3 text-lg md:text-xl text-slate-400" />
            <input
              type="text"
              name="search"
              placeholder={
                isSearching
                  ? "Searching..."
                  : "Search products, brands, tags..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              disabled={isSearching}
              className="w-full flex-1 lg:flex-0 md:w-40 lg:w-72 xl:w-96 h-9 md:h-10 text-sm font-medium text-slate-800 border border-slate-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none rounded-md pl-9 md:pl-10 pr-3 bg-white transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex items-center text-2xl lg:text-3xl text-slate-600 gap-4 lg:gap-6 shrink-0">
          <MdOutlineAccountCircle
            onClick={() => nav("/profile")}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          />
          <MdOutlineFavoriteBorder
            onClick={() => nav("/wishlist")}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          />
          <MdOutlineShoppingCart
            onClick={() => nav("/cart")}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          />
          <MdOutlineSettings
            onClick={() => nav("/settings")}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
