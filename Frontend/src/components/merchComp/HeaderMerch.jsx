import { MdHome, MdLocalGroceryStore, MdAccountCircle } from "react-icons/md";
import { useMerchant } from "../../context/merchantContext";
import { Link } from "react-router-dom";

function HeaderMerch() {
  const { dispatch } = useMerchant();
  return (
    <div className="w-full py-2 bg-slate-50 px-10 border-b border-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-between flex-1">
          {/* search bar */}
          <div className="flex flex-1"></div>

          {/* nav */}
          <div className="flex items-center justify-around gap-8 text-2xl ">
            <Link
              to={"/profile"}
              className="cursor-pointer hover:text-slate-400 transition-color"
            >
              <MdAccountCircle />
            </Link>
            <Link
              to={"/home"}
              className="cursor-pointer hover:text-slate-400 transition-color"
            >
              <MdHome />
            </Link>
            <Link
              to={"/cart"}
              className="cursor-pointer hover:text-slate-400 transition-color"
            >
              <MdLocalGroceryStore className="cursor-pointer" />
            </Link>
          </div>
        </div>
        {/* vertical line */}
        <div className="hidden md:block w-px h-8 bg-slate-300 mx-4"></div>
        {/* add items */}
        <div
          className="text-lg text-white tracking-tight capitalize bg-black px-5 py-1 rounded-lg cursor-pointer"
          onClick={() =>
            dispatch({ type: "SET_SCREEN", payload: "ADD_PRODUCT" })
          }
        >
          + add product
        </div>
      </div>
    </div>
  );
}

export default HeaderMerch;
