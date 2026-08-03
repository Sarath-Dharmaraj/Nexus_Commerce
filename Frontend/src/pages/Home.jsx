import { useLoaderData, useNavigate } from "react-router-dom";
import {
  MdOutlineStar,
  MdOutlineFavoriteBorder,
  MdShoppingCartCheckout,
} from "react-icons/md";
import Footer from "../components/protectedPageComp/Footer";

export default function Home() {
  // hooks
  const data = useLoaderData();
  const nav = useNavigate();

  return (
    <div className="px-8 py-6 flex flex-col justify-around gap-5">
      <div className="flex flex-col justify-around gap-8">
        {/* Banner for current trends and offers */}
        <div className="bg-[url('/background_home.png')] bg-cover bg-center bg-no-repeat h-100 border rounded-md flex flex-col items-start justify-center gap-3 text-white px-16">
          <span className="text-4xl mb-2 font-bold">Curated Excellence</span>
          <span>
            Discover the season's defining pieces. Institutional confidence
          </span>
          <span>meets high-end trail.</span>
          <div className="bg-black px-6 py-2 mt-4 cursor-pointer hover:bg-slate-800 transition-colors font-semibold rounded-sm">
            Explore Collection
          </div>
        </div>

        {/* Sort and Filter */}
        <div className="w-full border-b border-slate-300 flex justify-end">
          <span className="px-3 py-2 text-sm font-semibold text-slate-700 cursor-pointer hover:text-slate-900">
            Sort & Filter
          </span>
        </div>

        {/* Product Sections */}
        <div className="flex flex-col gap-8">
          {data?.map((section, key) => (
            <div key={key} className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                {section.title}
              </h2>

              {/* Product Cards Row */}
              <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
                {section.products.map((item, itemKey) => (
                  <div
                    key={itemKey}
                    onClick={() => {
                      nav(`/product/${item._id}`);
                    }}
                    className="w-64 shrink-0 h-80 flex flex-col border border-slate-200 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="h-48 w-full bg-slate-100 relative overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.skuTitle || "Product"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute z-10 bg-white/90 backdrop-blur-sm top-2 right-2 flex items-center gap-2 text-lg px-2 py-1 rounded border border-slate-200 shadow-sm">
                        <MdShoppingCartCheckout className="hover:text-blue-600 transition-colors" />
                        <MdOutlineFavoriteBorder className="hover:text-red-500 transition-colors" />
                      </div>
                    </div>

                    <div className="flex-1 w-full px-3 py-3 flex flex-col justify-between bg-white text-xs border-t border-slate-100">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-center w-full">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider truncate">
                            {item.brand || "Nexus"}
                          </p>
                          <div className="inline-flex items-center gap-1 font-semibold text-slate-700 shrink-0">
                            <MdOutlineStar className="text-amber-500" />{" "}
                            {item.averageRating || "0"}
                          </div>
                        </div>

                        <span className="font-bold text-slate-800 text-sm line-clamp-2 leading-tight">
                          {item.skuTitle}
                        </span>
                      </div>

                      <span className="font-extrabold text-slate-900 text-base">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
