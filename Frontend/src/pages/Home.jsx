import { useLoaderData } from "react-router-dom";

import Footer from "../components/protectedPageComp/Footer";
import ProductSlide from "../components/protectedPageComp/ProductSlide";

export default function Home() {
  // hooks
  const { feedData = [], wishlist = [], cart = [] } = useLoaderData() || {};
  return (
    <div className="px-2 md:px-4 lg:px-8 py-1 md:py-3 lg:py-6 flex flex-col justify-around md:gap-3 lg:gap-5">
      <div className="flex flex-col justify-around gap-8">
        {/* Banner for current trends and offers */}
        <div className="bg-[url('/background_home.png')] bg-cover bg-center bg-no-repeat h-100 border rounded-md flex flex-col items-start justify-center gap-3 text-white px-4 md:px-10 lg:px-16">
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
          <span className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
            Explore Catalog
          </span>
        </div>

        {/* Product Sections */}
        <div className="flex flex-col gap-2 md:gap-5 lg:gap-8">
          {feedData?.map((section, key) => (
            <div key={key} className="flex flex-col gap-1 md:gap-2 lg:gap-4">
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                {section.title}
              </h2>

              <ProductSlide
                products={section.products}
                wishlist={wishlist}
                cart={cart}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
