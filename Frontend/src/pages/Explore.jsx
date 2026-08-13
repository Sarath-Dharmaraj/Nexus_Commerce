import { MdStar, MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer relative"
    >
      {product.soldCount > 50 && (
        <div className="absolute top-2 left-2 z-10 bg-orange-100 text-orange-700 text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm">
          Hot
        </div>
      )}

      <div className="relative w-full aspect-square bg-slate-50 p-4 flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={product.imageUrl}
          alt={product.skuTitle}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {product.brand}
        </span>

        <h3 className="text-xs md:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {product.skuTitle}
        </h3>

        <div className="mt-auto pt-3 flex items-end justify-between w-full">
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-black text-slate-900 tracking-tight">
              $
              {Number(product.price).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
            {product.mrp > product.price && (
              <span className="text-[10px] text-slate-400 line-through font-semibold">
                ${Number(product.mrp).toLocaleString("en-US")}
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
            <MdStar className="text-[10px] md:text-xs" />
            <span className="text-[10px] md:text-xs font-bold text-amber-700">
              {product.averageRating > 0
                ? product.averageRating.toFixed(1)
                : "New"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Explore() {
  const location = useLocation();

  const products = location.state?.products || [];
  const query = location.state?.query || "";

  return (
    <div className="w-full min-h-screen bg-slate-50 font-hanken">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
              {query ? `Results for "${query}"` : "Explore Products"}
            </h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">
              Discover the latest gear from our verified merchants.
            </p>
          </div>

          <div className="text-xs md:text-sm font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-sm w-fit">
            Showing {products.length} results
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center bg-white border border-dashed border-slate-300 rounded-xl">
            <MdOutlineShoppingCart className="text-6xl text-slate-200 mb-3" />
            <p className="text-lg font-bold text-slate-500">
              No products found
            </p>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Try adjusting your search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id || product.skuId}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
