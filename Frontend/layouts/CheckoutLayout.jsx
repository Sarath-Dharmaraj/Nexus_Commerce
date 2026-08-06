import { MdStorefront } from "react-icons/md";
import { Outlet, useLoaderData } from "react-router-dom";
import CartSummary from "../src/components/checkoutComp/CartSummary";
import Footer from "../src/components/protectedPageComp/Footer";

function CheckoutLayout() {
  const { cart } = useLoaderData();

  return (
    <div className="w-full h-screen flex flex-col gap-10 bg-slate-100 font-hanken text-slate-600 tracking-tight overflow-hidden">
      <div className="w-full flex items-center justify-center gap-4 bg-white text-2xl text-slate-800 tracking-wider font-blaack py-5 border-b border-slate-200 shrink-0">
        <span className="">
          <MdStorefront />{" "}
        </span>
        Nexus Commerce
      </div>

      <div className="w-full flex-1 flex justify-between gap-6 px-12 py-5 overflow-hidden">
        <Outlet />
        <CartSummary cart={cart} />
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutLayout;
