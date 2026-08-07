import { Outlet, useLoaderData } from "react-router-dom";
import { MdStorefront, MdCheck, MdCircle } from "react-icons/md";
import CartSummary from "../components/checkoutComp/CartSummary";
import Footer from "../components/protectedPageComp/Footer";

function CheckoutLayout() {
  const { cart } = useLoaderData();

  return (
    <div className="w-full h-screen flex flex-col gap-4 bg-slate-100 font-hanken text-slate-600 tracking-tight overflow-hidden">
      <div className="w-full flex items-center justify-center gap-4 bg-white text-2xl text-slate-800 tracking-wider font-blaack py-5 border-b border-slate-200 shrink-0">
        <span className="">
          <MdStorefront />{" "}
        </span>
        Nexus Commerce
      </div>

      <div className="w-full flex-1 flex justify-between gap-1 px-12 py-1 overflow-hidden">
        <div className="flex flex-col items-start justify-between w-full">
          {/* checkout roadmap */}
          <div className="w-full flex justify-between">
            {/* container 1 */}
            <div className="w-full flex flex-col items-start gap-1 flex-1 text-blue-600 text-sm font-bold tracking-tight">
              <div className="w-full flex items-center">
                <span className="text-xl p-3 bg-white border rounded-md border-blue-600">
                  <MdCheck />{" "}
                </span>
                <span className="w-full h-px border border-blue-600"></span>
              </div>
              <span>Cart</span>
            </div>
            {/* container 2 */}
            <div className="w-full flex flex-col items-start gap-1 flex-1 text-blue-600 text-sm font-bold tracking-tight">
              <div className="w-full flex items-center">
                <span className="text-slate-600 text-xl p-3 bg-white border rounded-md border-blue-600">
                  <MdCircle className="" />
                </span>
                <span className="w-full h-px border border-slate-400 flex-1"></span>
              </div>
              <span>Shipping</span>
            </div>
            {/* container 3 */}
            <div className=" flex flex-col items-start gap-1 text-sm font-bold tracking-tight shrink-0">
              <div className="w-full flex items-center">
                <span className="text-white text-xl p-3 bg-white border rounded-md border-slate-400">
                  <MdCircle />
                </span>
              </div>
              <span>Payment</span>
            </div>
          </div>
          <Outlet />
        </div>

        <CartSummary cart={cart} />
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutLayout;
