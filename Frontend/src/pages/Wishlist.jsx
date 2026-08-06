import { useLoaderData, useFetcher } from "react-router-dom";
import { MdOutlineShoppingBasket } from "react-icons/md";

import Footer from "../components/protectedPageComp/Footer";
import ProductSlide from "../components/protectedPageComp/ProductSlide";

function Wishlist() {
  const { wishlist, cart } = useLoaderData();
  console.log(wishlist.length);
  const fetcher = useFetcher();

  return (
    <div className="w-full h-full text-slate-600 font-hanken tracking-tight flex flex-col items-start px-12 py-8 gap-4 overflow-hidden">
      <div className="flex flex-col items-start justify-around px-6 py-4 gap-2">
        <h1 className="text-4xl text-slate-800 font-black">Saved Items</h1>
        <span className="tracking-wider">
          Review and manage your curated selections.
        </span>
      </div>
      {/* Product Cards Row */}
      <div
        className={`w-full overflow-auto ${wishlist.length === 0 ? "m-auto inline-flex justify-center" : ""}`}
      >
        {wishlist.length === 0 ? (
          <span className="text-2xl font-black text-slate-800 tracking-wider px-8 py-6 border border-dashed rounded-lg border-slate-600">
            Add Products on wishlist
          </span>
        ) : (
          <ProductSlide products={wishlist} cart={cart} />
        )}
      </div>
      <fetcher.Form
        method="post"
        className={`bg-blue-500 text-white px-4 py-2 border rounded-lg self-end ${wishlist.length === 0 ? "hidden" : ""}`}
      >
        <input type="hidden" name="intent" value="wishlist_to_cart" />
        <button
          type="submit"
          className="flex items-center justify-center gap-2"
          disabled={wishlist.length === 0}
        >
          <span>
            <MdOutlineShoppingBasket />
          </span>
          Add all to cart
        </button>
      </fetcher.Form>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Wishlist;
