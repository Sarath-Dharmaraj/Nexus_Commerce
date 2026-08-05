import { useLoaderData } from "react-router-dom";
import Footer from "../components/protectedPageComp/Footer";
import ProductSlide from "../components/protectedPageComp/ProductSlide";

function Wishlist() {
  const { wishlist, cart } = useLoaderData();

  return (
    <div className="w-full h-full text-slate-600 font-hanken tracking-tight flex flex-col items-start px-12 py-10 gap-6">
      <div className="flex flex-col items-start justify-around px-6 py-4 gap-2">
        <h1 className="text-4xl text-slate-800 font-black">Saved Items</h1>
        <span className="tracking-wider">
          Review and manage your curated selections.
        </span>
      </div>
      {/* Product Cards Row */}
      <ProductSlide products={wishlist} cart={cart} />

      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default Wishlist;
