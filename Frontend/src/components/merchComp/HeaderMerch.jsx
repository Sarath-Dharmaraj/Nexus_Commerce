import { MdOutlineSearch, MdHome, MdLocalGroceryStore } from "react-icons/md";

function HeaderMerch() {
  return (
    <div className="w-full py-2 bg-slate-50 px-10 border-b border-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-between flex-1">
          {/* search bar */}
          <div className="relative flex items-center w-full md:w-auto">
            <MdOutlineSearch className="absolute left-2 text-lg md:text-xl lg:text-2xl text-slate-500" />
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="w-full md:w-40 lg:w-72 xl:w-96 h-8 md:h-10 text-sm lg:text-base text-slate-600 border border-slate-400 hover:border-blue-200 focus:border-blue-200 focus:outline-none rounded-md pl-8 md:pl-9 lg:pl-10 pr-3 md:pr-4 bg-slate-100"
            />
          </div>

          {/* nav */}
          <div className="flex items-center justify-around gap-8 text-2xl ">
            <span className="cursor-pointer hover:text-slate-400 transition-color">
              <MdHome />
            </span>
            <span className="cursor-pointer hover:text-slate-400 transition-color">
              <MdLocalGroceryStore className="cursor-pointer" />
            </span>
          </div>
        </div>
        {/* vertical line */}
        <div className="hidden md:block w-px h-8 bg-slate-300 mx-4"></div>
        {/* add items */}
        <div className="text-lg text-white tracking-tight capitalize bg-black px-5 py-1 rounded-lg cursor-pointer">
          + add product
        </div>
      </div>
    </div>
  );
}

export default HeaderMerch;
