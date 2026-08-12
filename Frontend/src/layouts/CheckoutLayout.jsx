import { Outlet, useLoaderData } from "react-router-dom";
import { MdStorefront, MdCheck, MdCircle } from "react-icons/md";
import CartSummary from "../components/checkoutComp/CartSummary";
import Footer from "../components/protectedPageComp/Footer";
import { CheckoutProvider } from "../context/checkoutContext";

function Layout({ cart }) {
  return (
    <div className="w-full h-screen flex flex-col gap-4 bg-slate-100 font-hanken text-slate-600 tracking-tight overflow-hidden">
      <div className="w-full flex items-center justify-center gap-2 md:gap-4 bg-white text-xl md:text-2xl text-slate-800 tracking-wider font-black py-4 md:py-5 border-b border-slate-200 shrink-0">
        <span className="">
          <MdStorefront />{" "}
        </span>
        Nexus Commerce
      </div>

      <div className="relative w-full flex-1 flex flex-col lg:flex-row justify-start lg:justify-between gap-6 lg:gap-1 px-4 md:px-8 lg:px-12 py-4 lg:py-1 overflow-y-auto lg:overflow-hidden">
        <div className="flex flex-col items-start gap-4 w-full lg:w-[65%] shrink-0">
          {/* checkout roadmap */}
          <div className="w-full flex justify-between">
            {/* container 1 */}
            <div className="w-full flex flex-col items-start gap-1 flex-1 text-blue-600 text-xs md:text-sm font-bold tracking-tight">
              <div className="w-full flex items-center">
                <span className="text-lg md:text-xl p-2 md:p-3 bg-white border rounded-md border-blue-600">
                  <MdCheck />{" "}
                </span>
                <span className="w-full h-px border border-blue-600"></span>
              </div>
              <span>Cart</span>
            </div>
            {/* container 2 */}
            <div className="w-full flex flex-col items-start gap-1 flex-1 text-blue-600 text-xs md:text-sm font-bold tracking-tight">
              <div className="w-full flex items-center">
                <span className="text-slate-600 text-lg md:text-xl p-2 md:p-3 bg-white border rounded-md border-blue-600">
                  <MdCircle className="" />
                </span>
                <span className="w-full h-px border border-slate-400 flex-1"></span>
              </div>
              <span>Shipping</span>
            </div>
            {/* container 3 */}
            <div className=" flex flex-col items-start gap-1 text-xs md:text-sm font-bold tracking-tight shrink-0">
              <div className="w-full flex items-center">
                <span className="text-white text-lg md:text-xl p-2 md:p-3 bg-white border rounded-md border-slate-400">
                  <MdCircle />
                </span>
              </div>
              <span>Payment</span>
            </div>
          </div>
          {/* outlet */}
          <Outlet />
        </div>

        <CartSummary cart={cart} />
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
    </div>
  );
}

function CheckoutLayout() {
  const { cart } = useLoaderData();

  return (
    <CheckoutProvider>
      <Layout cart={cart} />
    </CheckoutProvider>
  );
}

export default CheckoutLayout;
