import { useNavigate, useFetcher } from "react-router-dom";
import {
  MdOutlineStar,
  MdFavorite,
  MdShoppingCartCheckout,
} from "react-icons/md";

function SlideCard({ item, cart, wishlist }) {
  const nav = useNavigate();
  const fetcher = useFetcher();

  const isWishlisted = Array.isArray(wishlist)
    ? wishlist.includes(item._id)
    : wishlist;
  const isInCart = Array.isArray(cart)
    ? cart.some((c) => c?.productId === item._id || c === item._id)
    : false;

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (fetcher.state !== "idle") return;

    fetcher.submit(
      {
        intent: "toggle_wishlist",
        actionType: isWishlisted ? "remove" : "add",
        productId: item._id,
      },
      { method: "post" },
    );
  };

  const handleCart = (e) => {
    e.stopPropagation();

    if (fetcher.state !== "idle") return;

    fetcher.submit(
      {
        intent: "add_cart",
        productId: item._id,
        quantity: 1,
      },
      { method: "post" },
    );
  };

  const isWishlistLoading =
    fetcher.formData?.get("intent") === "toggle_wishlist";
  const isCartLoading = fetcher.formData?.get("intent") === "add_cart";

  return (
    <div
      onClick={() => nav(`/product/${item._id}`)}
      className="w-40 sm:w-48 md:w-56 lg:w-64 shrink-0 flex flex-col border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group snap-start"
    >
      <div className="h-36 sm:h-40 md:h-44 lg:h-48 w-full bg-slate-100 relative overflow-hidden shrink-0 flex items-center justify-center">
        <img
          src={item.imageUrl}
          alt={item.skuTitle || "Product"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 bg-white/90 backdrop-blur-sm top-2 right-2 flex items-center gap-1 sm:gap-2 text-base sm:text-lg px-1.5 sm:px-2 py-1 rounded border border-slate-200 shadow-sm"
        >
          {/* Cart Icon */}
          <MdShoppingCartCheckout
            onClick={handleCart}
            className={`cursor-pointer transition-colors ${
              isCartLoading ? "opacity-50 animate-pulse" : ""
            } ${
              isInCart
                ? "text-green-500 hover:text-green-600"
                : "text-slate-500 hover:text-blue-600"
            }`}
          />

          {/* Wishlist Icon */}
          <MdFavorite
            onClick={handleWishlist}
            className={`cursor-pointer transition-colors ${
              isWishlistLoading ? "opacity-50 animate-pulse" : ""
            } ${
              isWishlisted
                ? "text-pink-500 hover:text-red-500"
                : "text-slate-400 hover:text-red-500"
            }`}
          />
        </div>
      </div>

      <div className="flex-1 w-full px-2 sm:px-3 py-2 sm:py-3 flex flex-col justify-between bg-white border-t border-slate-100">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center w-full">
            <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">
              {item.brand || "Nexus"}
            </p>
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-slate-700 shrink-0">
              <MdOutlineStar className="text-amber-500 text-xs sm:text-sm" />{" "}
              {item.averageRating || "0"}
            </div>
          </div>

          <span className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-2 leading-tight">
            {item.skuTitle}
          </span>
        </div>

        <span className="font-extrabold text-slate-900 text-sm sm:text-base lg:text-lg mt-2">
          $
          {Number(item.price || 0).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}

function ProductSlide({ products, cart = [], wishlist = true }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory w-full">
      {products.map((item, itemKey) => (
        <SlideCard key={itemKey} item={item} cart={cart} wishlist={wishlist} />
      ))}
    </div>
  );
}

export default ProductSlide;
